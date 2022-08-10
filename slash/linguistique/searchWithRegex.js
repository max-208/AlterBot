const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dictionnaire-by-regex')
		.setDescription('cherche un mot dans le dictionnaire via une regex sql')
		.addSubcommand(subcommand =>
			subcommand.setName('francais')
					  .setDescription('rechercher un mot à partir du français')
					  .addStringOption(option=>
						option.setName('regex')
							  .setDescription('la regex (format sql (opérateur like)) avec laquelle le mot sera recherchée')
							  .setRequired(true)
					)
					.addIntegerOption(option =>
						option.setName('offset')
							  .setDescription('le combientième mot vous voulez '))
		)
		.addSubcommand(subcommand =>
			subcommand.setName('pierrick')
					  .setDescription('recherche un mot à partir du pierrick')
					  .addStringOption(option=>
						option.setName('regex')
							  .setDescription('la regex (format sql (opérateur like)) avec laquelle le mot sera recherchée')
							  .setRequired(true)
					)
					.addIntegerOption(option =>
						option.setName('offset')
							  .setDescription('le combientième mot vous voulez '))
		),

	async execute(interaction) {
        const regex = interaction.options.getString('regex')
		let offset = interaction.options.getInteger('offset');
		if (offset == 'undefined') offset = 0;
		//search a word by the like operator on francais column 
		if (interaction.options.getSubcommand() == 'francais'){
			await interaction.deferReply();
			if (offset == 'undefined' || offset == null) offset = 0;
			let list = await data.db_linguistique.searchByFrenchRegex(regex, offset);
			if(list.length == 0) await interaction.editReply("le mot n'a pas été trouvé");
			else {
			let i = 0;
				for (const element of list) {
					const embedSearch = new MessageEmbed()
						.setColor(0x0000FF)
						.setTitle(`${element.francais}`)
						.setDescription(`${element.pierrick}`)
						.addFields(
							{name: '\u200b', value: '\u200B'},
							{name: 'cyrilique', value: `${element.cyrilic}`},
							{name: 'hangeul', value: `${element.hangeul}`},
							{name: 'étymologie', value: `${element.étymologie}`},
							{name: 'phonétique', value: `${element.phonétique}`},
							
							{name: '\u200b', value: '\u200B'},
							{name: 'classe grammaticale', value: `${element.classe}`},
							{name: 'définition', value: `${element.définition}`},
							{name: 'commentaire', value: `${element.commentaire}`},
							{name: 'id', value: `${element.id}`}
						)
					if (i == 0){
						await interaction.editReply({embeds: [embedSearch]});
					}
					else {
						await interaction.followUp({embeds: [embedSearch]});
					}
					i++;
				}
			}
		}
		//search a word by like operator on pierrick column
		else if (interaction.options.getSubcommand() == 'pierrick'){
			await interaction.deferReply();
			if (offset == 'undefined' || offset == null) offset = 0;
			let list = await data.db_linguistique.searchByPierrickRegex(regex, offset);
			if(list.length == 0) await interaction.editReply("le mot n'a pas été trouvé");
			else {
			let i = 0;
				for (const element of list) {
					const embedSearch = new MessageEmbed()
						.setColor(0x0000FF)
						.setTitle(`${element.francais}`)
						.setDescription(`${element.pierrick}`)
						.addFields(
							{name: '\u200b', value: '\u200B'},
							{name: 'cyrilique', value: `${element.cyrilic}`},
							{name: 'hangeul', value: `${element.hangeul}`},
							{name: 'étymologie', value: `${element.étymologie}`},
							{name: 'phonétique', value: `${element.phonétique}`},
							
							{name: '\u200b', value: '\u200B'},
							{name: 'classe grammaticale', value: `${element.classe}`},
							{name: 'définition', value: `${element.définition}`},
							{name: 'commentaire', value: `${element.commentaire}`},
							{name: 'id', value: `${element.id}`}
						)
					if (i == 0){
						await interaction.editReply({embeds: [embedSearch]});
					}
					else {
						await interaction.followUp({embeds: [embedSearch]});
					}
					i++;
				}
			}
		}
    }
}