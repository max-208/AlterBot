const Discord = require('discord.js');
require("dotenv").config();
module.exports = {

    colGreen : "#2E8B57",
    colRed : "#FF0000",
    colBlue : "#4169E1",
    roleMod :process.env.MOD_ROLE,
    logWarnMod : process.env.MOD_WARN_LOG,
    salonMeme : process.env.SALON_MEME,

    /**
     * @param {Discord.Message} message 
     * @param {Discord.GuildMember} member 
     */
    async warn(message,member){
        console.log(new Date().toLocaleString() + " - warn message");
        var texte = message.content;
        var embed = new Discord.EmbedBuilder()
        .addFields([{name: "contenu du message", value: texte + "\u200B"}])
        .setFooter({text: "id utilisateur :"  + message.author.id});
        if(member != null){
            embed
            .setDescription("Auteur : " + message.author.toString() + " `" + message.author.tag + "`\nModerateur : " + member.toString() + " `" + member.user.tag + "`\nSalon : " + message.channel.toString() + " `" + message.channel.name +"`\nLien : [message](" + message.url + ")")
            .setTitle("Rapport de message")
            .setColor(this.colRed)
        } else {
            embed
            .setDescription("Auteur : " + message.author.toString() + " `" + message.author.tag + "`\nAutomoderation\nLien : [message](" + message.url + ")")
            .setTitle("Repost")
            .setColor(this.colGreen)
        }
		if(message.attachments.first() != undefined){
			var attachementText = "";
			message.attachments.forEach(att => {
				attachementText = att.url + "\n" + attachementText 
			});
            embed.addFields([{name: "attachements", value: attachementText}]);
		}
        
        if(member!=null){
            message.client.channels.fetch(this.logWarnMod).then(channel => {;
                channel.send({embeds:[embed], content : message.author.id});});
            message.author.send({embeds:[embed], content : "Votre message a été jugé inaproprié ou non respectueux des regles du salon " + message.channel.toString() + " ou du serveur **AlterHis et Uchronies** par un modérateur.\nCeci n'est qu'un avertissement, cependant en cas de repetition cette infraction sera stockée et poura servir a justifier une sanction." });
        } else {
            message.author.send({embeds:[embed], content :"Le repost hammer est tombé *bonk*"});
        }
    }, 
};
