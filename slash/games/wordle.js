const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const { wordle, wordList } = require('../../utils/wordle.js');
const utilities = require('../../utils/utilities.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle')
        .setDescription('Joue au jeu Wordle !')
        .addSubcommand(subcommand =>
        subcommand  .setName('play')
                    .setDescription('Commence une partie de Wordle')
        ).addSubcommand(subcommand =>
        subcommand  .setName('guess')
                    .setDescription('Fait une supposition pour le mot Wordle')
                    .addStringOption(option =>
                        option.setName('mot')
                        .setDescription('Le mot à deviner')
                        .setRequired(true))
        ).addSubcommand(subcommand =>
        subcommand  .setName('stat')
                    .setDescription("Affiche les statistiques d'un joueur")
                    .addUserOption(option =>
                        option  .setName('joueur')
                                .setDescription('Le joueur dont vous voulez voir les statistiques')
                                .setRequired(false))
        ).addSubcommand(subcommand =>
        subcommand  .setName('top')
                    .setDescription('Affiche le top des joueurs de Wordle')
                    .addIntegerOption(option =>
                    option  .setName('page')
                            .setDescription('La page du top à afficher')
                            .setRequired(false))
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const authorId = interaction.user.id;

        switch (subcommand) {
            case 'play':
                this.startGame(authorId).then(() => {
                    let message = 'error';
                    if (interaction.inGuild()) {
                        message = `Une nouvelle partie de Wordle a été lancée pour <@${authorId}> ! Celle-ci se déroulera en DM.`;
                        interaction.user.send("Vous pouvez commencer à jouer en utilisant la commande `/wordle guess` suivie de votre supposition. Par exemple : `/wordle guess mot`");
                    } else message = `Une nouvelle partie de Wordle a été lancée pour <@${authorId}> !`;
                    interaction.reply({
                        content: message,
                        ephemeral: true
                    });
                }).catch(err => {
                    console.error(err);
                    interaction.reply({
                        content: "Une erreur est survenue lors du démarrage de la partie. Veuillez prévenir <@1004518765834289302> et réessayer plus tard.",
                        ephemeral: true
                    });
                })
                break;
            case 'guess':
                if (interaction.inGuild()) {
                    return interaction.reply({
                        content: "Vous ne pouvez pas jouer à Wordle dans un salon de discussion. Veuillez utiliser cette commande en message privé.",
                        ephemeral: true
                    });
                }
                // eclate les lettres accentuées en caractère + accents puis supprime le bloc unicode des diacritiques
                const guess = interaction.options.getString('mot').toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if (guess.length !== 5) {
                    return interaction.reply({
                        content: "Veuillez entrer un mot de 5 lettres.",
                        ephemeral: true
                    });
                } else if (!guess.match(/^[A-Z]{5}$/)) {
                    return interaction.reply({
                        content: "Veuillez entrer un mot valide composé uniquement de 5 lettres majuscules.",
                        ephemeral: true
                    });
                } else if (!wordList.includes(guess)) {
                    return interaction.reply({
                        content: "Ce mot n'est pas dans la liste des mots valides. Veuillez essayer un autre mot.",
                        ephemeral: true
                    });
                }

                this.makeGuess(authorId, guess).catch((err) => {
                    console.error(err);
                    interaction.reply({
                        content: "Une erreur est survenue lors de la vérification de votre supposition. Veuillez réessayer plus tard.",
                        ephemeral: true
                    });
                })
                break;
            case 'stat':
                const user = interaction.options.getUser('joueur') || interaction.user;
                this.getStats(user.id).catch(_ => {
                    interaction.reply({
                        content: "Cette personne n'a pas encore joué à Wordle !",
                        ephemeral: true
                    })
                })
                break;
            case 'top':
                const page = interaction.options.getInteger('page') || 1;
                this.getTop(page).catch(err => {
                    console.error(err);
                    interaction.reply({
                        content: "Une erreur est survenue lors de la récupération du top des joueurs. Veuillez réessayer plus tard.",
                        ephemeral: true
                    });
                })
                break;
        }

    },

    async startGame(userId) {

    },

    async makeGuess(userId, guess) {

    },

    async getStats(userId) {

    },

    async getTop(page) {
        page -= 1; // Convert to 0-based index
    },
}