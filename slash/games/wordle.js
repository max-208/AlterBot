const { SlashCommandBuilder, InteractionContextType, EmbedBuilder} = require('discord.js');
const { wordle, wordList } = require('utils/wordle.js');
const utilities = require('utils/utilities.js');

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
                    interaction.reply({
                        content: err,
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

                this.makeGuess(authorId, guess, interaction).catch((err) => {
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
                this.getTop(page, interaction).catch(err => {
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
        const gameStamp = wordle.getLastGame(userId);
        if (await wordle.getPlayerActualGame(userId, gameStamp)) {
            return Promise.reject("Vous avez déjà une partie en cours. Veuillez terminer votre partie actuelle avant d'en commencer une nouvelle.");
        }
        await wordle.addPlayerToGame(userId);
    },

    async makeGuess(userId, guess, interaction) {
        if (!await wordle.verifyPlayerStartedGame(userId, guess)) {
            return interaction.reply({
                content: "Vous n'avez pas encore commencé de partie. Veuillez utiliser la commande `/wordle play` pour commencer une nouvelle partie.",
                ephemeral: true
            });
        }

        if (!await wordle.insertGuessIntoDb()){
            return interaction.reply({
                content: "Vous avez déjà fait 6 suppositions pour cette partie !",
                ephemeral: true
            })
        }

        const {embed, attachment, validatedArray} = await wordle.buildGuessEmbed(userId)
        if (embed) {
            interaction.user.send({ embeds: [embed], files: [attachment] }).catch(err => {
                console.error("Erreur lors de l'envoi du message en DM :", err);
                interaction.reply({
                    content: "Une erreur est survenue lors de l'envoi du message en DM.",
                    ephemeral: true
                });
            });
        } else {
            interaction.reply({
                content: "Vous avez déjà trouvé le mot !",
                ephemeral: true
            });
        }
        if (validatedArray[5] || validatedArray[validatedArray.filter((v) => v !== null).length - 1].reduce((a, b) => a + b, 0) === 10 ){
            await wordle.updatePlayerStats()
        }

    },

    async getStats(userId) {
        const embed = await wordle.getPlayerStatsEmbed(userId);
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },

    async getTop(page, interaction) {
        if (page < 1) {
            interaction.reply("Vous devez spécifier une page supérieure ou égale à 1.", { ephemeral: true });
            return;
        }
        page -= 1; // Convert to 0-based index
        const topPlayers = await wordle.getTopPlayers(page);
        let messageBody = "";
        for (let i = 0; i < topPlayers.length; i++) {
            messageBody += `${i}. <@${topPlayers[i].id}> : ${topPlayers[i].score_total} points\n`;
        }
        const embed = new EmbedBuilder()
            .setTitle("Wordle")
            .setDescription(`${messageBody}`)
            .setColor(0x00FF00)
            .setFooter({ text: `Page ${page + 1}` });
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },
}