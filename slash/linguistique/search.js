const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dictionnaire')
		.setDescription('cherche un mot dans le dictionnaire')
		.addSubcommand(subcommand =>
			subcommand.setName('id')
					  .setDescription("recherche un mot directement par son id")
				.addIntegerOption(option =>
					option.setName('id')
						  .setDescription("l'id du mot")
						  .setRequired(true)
					)
		)
		.addSubcommand(subcommand =>
			subcommand.setName('francais')
					  .setDescription('rechercher un mot à partir du français')
				.addStringOption(option=>
					option.setName('mot')
						.setDescription('le mot à rechercher')
						.setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('offset')
						.setDescription('le combientième mot vous voulez'))
		)
		.addSubcommand(subcommand =>
			subcommand.setName('pierrick')
					  .setDescription('recherche un mot à partir du pierrick')
				.addStringOption(option=>
					option.setName('mot')
						  .setDescription('le mot à rechercher')
						  .setRequired(true)
				)
				.addIntegerOption(option =>
					option.setName('offset')
						  .setDescription('le combientième mot vous voulez '))
		),

	async execute(interaction) {
		const mot = interaction.options.getString('mot')
		let offset = interaction.options.getInteger('offset');
		if (offset == 'undefined') offset = 0;
		//search a word by its id 
		if (interaction.options.getSubcommand() == 'id'){
			await interaction.deferReply();
			const id = interaction.options.getInteger('id');
			const element = await data.db.getWord(id)
			if (element.pierrick == 'undefined') await interaction.editReply("le mot n'a pas été trouvé");
			else {
				const embedSearch = new MessageEmbed()
						.setColor(0x0000FF)
						.setTitle(`${element.francais}\u200b`)
						.setDescription(`${element.pierrick}\u200b`)
						.addFields(
							{name: '\u200b', value: '\u200B'},
							{name: 'cyrilique', value: `${element.cyrilic}\u200b`},
							{name: 'hangeul', value: `${element.hangeul}\u200b`},
							{name: 'étymologie', value: `${element.étymologie}\u200b`},
							{name: 'phonetique', value: `${element.phonétique}\u200b`},
							{name: '\u200b', value: '\u200B'},
							{name: 'classe grammaticale', value: `${element.classe}\u200b`},
							{name: 'définition', value: `${element.définition}\u200b`},
							{name: 'commentaire', value: `${element.commentaire}\u200b`},
							{name: 'id', value: `${element.id}\u200b`}
						)
				
				await interaction.editReply({embeds: [embedSearch]});
			}
		}
		//search a word by its french soundex
		else if (interaction.options.getSubcommand() == 'francais'){
			await interaction.deferReply();
			let soundexedMot = data.soundex.soundex(mot);
			
			if (offset == 'undefined' || offset == null) offset = 0;
			let list = await data.db.searchByFrench(soundexedMot, offset);
			let i = 0;
			if(list.length == 0) await interaction.editReply("le mot n'a pas été trouvé");
			else {
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
							{name: 'phonetique', value: `${element.phonétique}\u200b`},
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
		//Search a word by its pierrick soundex
		else if (interaction.options.getSubcommand() == 'pierrick'){
			
			if (offset == 'undefined' || offset == null) offset = 0;
			let soundexedMot = data.soundex.soundex(mot);
			
			
			let list = await data.db.searchByPierrick(soundexedMot, offset);
			let i = 0;
			
			
			await interaction.deferReply();
			if (list.length == 0) await interaction.editReply('le mot n\'a pas été trouvé');
			else {
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
							{name: 'phonetique', value: `${element.phonétique}\u200b`},
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

	},
};
