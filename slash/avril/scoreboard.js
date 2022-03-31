const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const data = require('data');
const utilities = require('../../utilities');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('scoreboard')
		.setDescription('recupere le classement des meilleurs')
        .addIntegerOption(option => option.setName('page').setRequired(false).setDescription('La page a visiter'))
		.setDefaultPermission(true),
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
		if(utilities.premierAvril == "TRUE"){
			let page = 0;
			let inv = false;
			if(interaction.options.getInteger("page") != undefined && interaction.options.getInteger("page") > 0){
				page = interaction.options.getInteger("page") - 1;
			} else if(interaction.options.getInteger("page") != undefined && interaction.options.getInteger("page") < 0){
				page = 0 - (interaction.options.getInteger("page") + 1);

			}
			let embed = new Discord.MessageEmbed();
			let list = [];
			if(inv){
				list = await data.premierAvril_dao.getScoreboardInv(page);
				embed.setTitle(" -- ScoreBoard (inversé) - page " + (page+1) + " -- ");
			} else {
				list = await data.premierAvril_dao.getScoreboard(page);
				embed.setTitle(" -- ScoreBoard - page " + (page+1) + " -- ");
			}
	
			let i = 0
			for(let element of list){
				i++;
				let pos = page * 10 + i;
				let user = await interaction.client.users.fetch(element.IdUser)
				embed.addField(pos + " - " + user.username,"Crédit social : "+element.UserScore);
			}
			embed.setColor("BLUE");
			interaction.reply({ embeds: [embed] });
		} else {
			return interaction.reply("quelle mysterieuse commande, je me demande ce qu'elle fait, attendons le premier avril pour voir");
		}
		
	},
};
