const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');
const { MessageEmbed } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('looksuggest')
		.setDescription('permet à awing de regarder les propositions, seul awing peut faire cette commande')
		.addIntegerOption(option =>
			option.setName('offset')
				  .setDescription('La page de suggestion demandée (n\'oublie pas, n-1')
		),
        
	async execute(interaction) {
		//verify is the interaction come from awing
		if (interaction.user.id == '361257883247050762'){

			let offset = interaction.options.getInteger('offset');
			if (offset == 'undefined' || offset == null) offset = 0;
			const numberOfSuggestion = await data.db_linguistique.countProposition();
			if (numberOfSuggestion.count == '0') {
				await interaction.reply("il n'y a pas de suggestion pour le moment");
			}
			else {
				let i = 0;
				list = await data.db_linguistique.lookToProposition(offset);
				for (const proposition of list){
					const title = "" + proposition.francais;
					let author = '';
					//try to fetch the user MUST BE REWORK
					try {
						author = "" + await interaction.client.users.fetch(proposition.instigateur);
					} catch (error) {
						console.log('error: user not found ' + error);	
						author = "error";
					}
					//as the embed builder need variable to be initialized as string, concat an empty string to the variable MUST BE REWORK
					const description = "" + proposition.id;
					const pierrick = "" + proposition.pierrick;
					const cyrilic = "" + proposition.cyrilic;
					const hangeul = "" + proposition.hangeul;
					const etymologie = "" + proposition.etymologie;
					const phonetique = "" + proposition.phonetique;
					const type = "" + proposition.type;
					const classe = "" + proposition.class;
					const definition = "" + proposition.definition;
					const commentaire = "" + proposition.commentaire;
					const pagination = `${offset + 1} / ${numberOfSuggestion.count}`
					const embedProposition = new MessageEmbed()
					.setColor(0x0011FF)
					.setAuthor(author)
					.setTitle(title)
					.setDescription(description)
					.addFields(
						{name: 'Pierrick', value: pierrick},
						{name: 'cyrilique', value: cyrilic},
						{name: 'hangeul', value: hangeul},
						{name: 'étymologie', value: etymologie},
						{name: 'phonetique', value: phonetique},
						{name: 'type', value: type},
						{name: '\u200b', value: '\u200B'},
						{name: 'classe grammaticale', value: classe},
						{name: 'définition', value: definition},
						{name: 'commentaire', value: commentaire}
					)
					.setFooter(`${pagination}`)
					i++;
					if (i == 1) await interaction.reply({embeds: [embedProposition],});
					else await interaction.followUp({embeds: [embedProposition],});
				}
			}
        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
