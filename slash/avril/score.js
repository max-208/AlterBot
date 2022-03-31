const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const data = require('data');
const utilities = require('../../utilities');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('recupere le score')
        .addUserOption(option => option.setName('utilisateur').setDescription('l\'utilisateur').setRequired(false))
		.setDefaultPermission(true),
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
		if(utilities.premierAvril == "TRUE"){
			let user = interaction.user;
			if(interaction.options.getUser("utilisateur") != undefined){
				user = interaction.options.getUser("utilisateur");
			}
			let embed = new Discord.MessageEmbed();
			embed.setTitle(" -- Crédit social de " + user.username + " -- ");
			embed.setThumbnail(user.avatarURL());
			await data.premierAvril_dao.getUser(user.id).then(function ret(res) {
				if(res == undefined){
					embed.addField("🔴 Crédit social","pas encore traqué",true)
					embed.addField("💪 Puissance du vote","encore inconnue",true)
				} else {
					embed.addField("🔴 Crédit social","\u200b"+res.UserScore,true)
					embed.addField("💪 Puissance du vote","\u200b"+res.Weight,true)
					if(res.UserScore > 0){
						embed.setColor("GREEN");
					}
					if(res.UserScore < 0){
						embed.setColor("RED");
					}
				}
			})
			embed.addField("\u200b","\u200b")
			let text = "\u200b";
			let lastVotes = await data.premierAvril_dao.getLastSentVotes(user.id);
			console.log(lastVotes);
			for(let vote of lastVotes){
				text = text + "[";
				if(vote.voteScore > 0){
					text = text + "+"
				}
				text = text + vote.voteScore + " donné" 
				//+ (await interaction.client.users.cache.get(vote.voteReciever)).username 
				+ "](https://discord.com/channels/" 
				+ interaction.guild.id + "/"
				+ vote.voteChannel + "/"
				+ vote.voteMessage
				+")\n";
			}
			embed.addField("📤 Derniers points donnés : ", text)
	
	
			text = "\u200b";
			lastVotes = await data.premierAvril_dao.getLastRecievedVotes(user.id);
			console.log(lastVotes);
			for(let vote of lastVotes){
				text = text + "[";
				if(vote.voteScore > 0){
					text = text + "+"
				}
				text = text + vote.voteScore + " reçu"
				//+ (await interaction.client.users.cache.get(vote.voteUser)).username 
				+ "](https://discord.com/channels/" 
				+ interaction.guild.id + "/"
				+ vote.voteChannel + "/"
				+ vote.voteMessage
				+")\n";
			}
			embed.addField("📥 Derniers points reçus : ", text,true)
			return interaction.reply({embeds : [embed]});
		} else{
			return interaction.reply("quelle mysterieuse commande, je me demande ce qu'elle fait, attendons le premier avril pour voir");
		}
		
	},
};