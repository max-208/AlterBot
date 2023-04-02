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
			let list = await data.db.searchByFrenchRegex(regex, offset);
			if(list.length == 0) await interaction.editReply("le mot n'a pas été trouvé");
			else {
			let i = 0;
				for (const element of list) {
					const embedSearch = new MessageEmbed()
						.setColor(0x0000FF)
						.setTitle(`${element.francais}\u200b`)
						.setDescription(`${element.pierrick}\u200b`)
						.addFields(
							{name: '\u200b', value: '\u200B'},
							{name: 'cyrilique', value: `${element.cyrilic}\u200b`},
							{name: 'hangeul', value: `${element.hangeul}\u200b`},
							{name: 'étymologie', value: `${element.étymologie}\u200b`},
							{name: 'phonétique', value: `${element.phonétique}\u200b`},
							
							{name: '\u200b', value: '\u200B'},
							{name: 'classe grammaticale', value: `${element.classe}\u200b`},
							{name: 'définition', value: `${element.définition}\u200b`},
							{name: 'commentaire', value: `${element.commentaire}\u200b`},
							{name: 'id', value: `${element.id}\u200b`}
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
			let list = await data.db.searchByPierrickRegex(regex, offset);
			if(list.length == 0) await interaction.editReply("le mot n'a pas été trouvé");
			else {
			let i = 0;
				for (const element of list) {
					const embedSearch = new MessageEmbed()
						.setColor(0x0000FF)
						.setTitle(`${element.francais}\u200b`)
						.setDescription(`${element.pierrick}\u200b`)
						.addFields(
							{name: '\u200b', value: '\u200B'},
							{name: 'cyrilique', value: `${element.cyrilic}\u200b`},
							{name: 'hangeul', value: `${element.hangeul}\u200b`},
							{name: 'étymologie', value: `${element.étymologie}\u200b`},
							{name: 'phonétique', value: `${element.phonétique}\u200b`},
							
							{name: '\u200b', value: '\u200B'},
							{name: 'classe grammaticale', value: `${element.classe}\u200b`},
							{name: 'définition', value: `${element.définition}\u200b`},
							{name: 'commentaire', value: `${element.commentaire}\u200b`},
							{name: 'id', value: `${element.id}\u200b`}
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