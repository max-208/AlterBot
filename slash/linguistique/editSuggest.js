const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('editsuggest')
		.setDescription('permet à awing de modifier les propositions, seul awing peut faire cette commande')
        .addStringOption(option =>
            option.setName('pierrick')
                  .setDescription('Le mot en pierrick')
                  .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('definition')
                  .setDescription('la définition de votre mot')
                  .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('etymologie')
                  .setDescription('d\'où provient votre mot')
                  .setRequired(true)
            )
        .addStringOption( option =>
            option.setName('francais')
                  .setDescription('la traduction francaise du mot (optionnel)')
            )
        .addStringOption( option =>
            option.setName('phonetique')
                  .setDescription("l'écriture de votre mot en alphabet phonétique international")
            )
        .addStringOption( option =>
            option.setName('class')
                  .setDescription('la classe gramaticale du mot')
            )
        .addStringOption(option=>
            option.setName('cyrilic')
                  .setDescription('le mot dans l\'alphabet cyrilique')
            )
        .addStringOption( option =>
            option.setName('hangeul')
                  .setDescription('l\'écriture de votre mot en hangeul')
            )
        .addStringOption( option =>
            option.setName('commentaire')
                  .setDescription("un commentaire supplémentaire (optionnel)")
            ),
	async execute(interaction) {
		if (interaction.user.id == '361257883247050762'){
            const id = interaction.options.getString('id');
            if (await data.db_linguistique.isIdValid(id)) {
                //obtention des paramètres et ajout dans un objet
                let param = {}
                param.pierrick = interaction.options.getString('pierrick');
                param.définition = interaction.options.getString('definition');
                param.étymologie = interaction.options.getString('etymologie');
                param.francais = interaction.options.getString('francais');
                param.phonétique = interaction.options.getString('phonetique');
                param.commentaire = interaction.options.getString('commentaire');
                param.cyrilic = interaction.options.getString('cyrilic');
                param.hangeul = interaction.options.getString('hangeul');
                param.classe = interaction.options.getString('class');
                let base = await data.db_linguistique.getWord(id);
                //on récupère les valeurs pour vérifier si quelque chose a été mit ou non, puis on remplace les valeurs par défaut par les valeurs utilisateurs
                for (proprieties of param){
                    if(param[proprieties] != undefined){
                        base[proprieties] = param[proprieties];
                    }
                }
                await data.db_linguistique.editWord(id, base);

            }
            else await interaction.reply("l'id est invalide")

        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
