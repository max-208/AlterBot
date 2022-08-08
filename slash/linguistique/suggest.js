const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('../../data/dao_linguistique');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('suggérer la création ou la modification d\'un mot')
        .addStringOption( option=>
            option.setName('type')
                  .setDescription("si votre demande consiste à modifier un mot existant ou à en créer un")
                  .addChoices([[ 'add', 'add'], [ 'edit', 'edit']]
                  )
                  .setRequired(true)
            )
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
                  .setDescription("l'écriture de votre mot en API, vous pouvez utiliser la commande /phonetize pour l'obtenir")
            )
        .addStringOption( option =>
            option.setName('class')
                  .setDescription("la classe gramaticale de votre mot")
        )
        .addStringOption( option =>
            option.setName('commentaire')
                  .setDescription("un commentaire supplémentaire (optionnel)")
            )
        .addStringOption(option=>
            option.setName('cyrilic')
                  .setDescription('le mot dans l\'alphabet cyrilique')
            )
        .addStringOption( option =>
            option.setName('hangeul')
                  .setDescription('l\'écriture de votre mot en hangeul')
            ),
        
        
	async execute(interaction) {
        await interaction.deferReply();
        let id = ""
        do {
            for (let i = 0; i <= 8; i++){
                //génère un identifiant aléatoire
                id = Math.ceil(Math.random() * 9) + id; 
            }
        } while(await data.db_linguistique.isPropositionIdTaken(id));
        let suggestion = {
            'id': id,
            'instigateur': interaction.user.id,
            'francais': interaction.options.getString('francais'),
            'pierrick': interaction.options.getString('pierrick'),
            'phonetique': interaction.options.getString('phonetique'),
            'commentaire': interaction.options.getString('commentaire'),
            'definition': interaction.options.getString('definition'),
            'etymologie': interaction.options.getString('etymologie'),
            'type': interaction.options.getString('type'),
            'class': interaction.options.getString('class'),
            'cyrilic': interaction.options.getString('cyrilic'),
            'hangeul': interaction.options.getString('hangeul')
        };
        await data.db_linguistique.addProposition(suggestion);
        await interaction.editReply('<@361257883247050762> une nouvelle suggestion a été postée')
	},
};
