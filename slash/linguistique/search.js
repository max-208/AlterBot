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
			subcommand.setName('langue')
					  .setDescription('rechercher un mot à partir d\'un mot dans une autre langue')
				.addStringOption(option =>
					option.setName('mode')
						  .setDescription("le mode de recherche")
						  .setRequired(true)
						  .addChoices(
							{name : 'classique', value : 'classique'},
							{name : 'regex', value : 'regex'},
						  )
				)
				.addStringOption(option =>
					option.setName('langue')
						  .setDescription('la langue du mot')
						  .setRequired(true)
						  .addChoices(
							{name : 'francais', value : 'francais'},
							{name : 'pierrick', value : 'pierrick'}
						  )
				)
				.addStringOption(option=>
					option.setName('mot')
						.setDescription('le mot à rechercher')
						.setRequired(true)
					)
			),

	async execute(interaction) {
		const mot = interaction.options.getString('mot')
		const langue = interaction.options.getString('langue')
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
		else {
			let result;
			const mode = interaction.options.getString('mode');
			if (mode == 'classique'){
				if (langue == 'francais') result = await data.db.searchByFrenchSpellfix(mot);
				else if (langue == 'pierrick') result = await data.db.searchByPierrickSpellfix(mot);
			}
			else if (mode == 'regex'){
				if (langue == 'francais') result = await data.db.searchByFrenchRegex(mot);
				else if (langue == 'pierrick') result = await data.db.searchByPierrickRegex(mot);
			}
			if (result.length == 0) await interaction.reply("aucun mot n'a été trouvé");
			else {
				let embed = {
					color: 0x0000FF,
					title: `résultat de la recherche pour ${mot}`,
					description: 'les mots suivants ont été trouvés, pour plus d\'information veuillez utiliser la commande /dictionnaire id avec l\id du mot',
					fields: []
				}
				for (let i = 0; i < result.length; i++){
					embed.fields.push({name: `${result[i].word}`, value: `id : ${result[i].id}, définition : ${result[i]["définition"]}`})
				}
				await interaction.reply({embeds: [embed]});
			}
		}
	},
};
