const Discord = require('discord.js');
require("dotenv").config();
module.exports = {

    colGreen : "#2E8B57",
    colRed : "#FF0000",
    colBlue : "#4169E1",
    roleMj : process.env.RP_ROLE_MJ,
    salonMj :process.env.RP_SALON_MJ,
    roleMod :process.env.MOD_ROLE,
    logWarnMod : process.env.MOD_WARN_LOG,
    salonMeme : process.env.SALON_MEME,

    /**
     * @param {Discord.GuildMember} member 
     */
    latiniser(member){
	    if(!member.roles.cache.some(role => role.id == this.roleMod )){
            var text = member.displayName
            chars = ["A","a","À","à","Â","â","Ä","ä","Ã","ã","B","b","C","c","ç","D","d","E","e","é","È","è","Ê","ê","Ë","ë","F","f","G","g","H","h","I","i","Ì","ì","Î","î","Ï","ï","J","j","K","k","L","l","M","m","N","n","Ñ","ñ","O","o","Ò","ò","Ô","ô","Ö","ö","Õ","õ","P","p","Q","q","R","r","S","s","T","t","U","u","Ù","ù","Û","û","Ü","ü","V","v","W","w","X","x","Y","y","ÿ","Z","z","","_","-","'",".",",",";",":","!","?","@","&","§","~","^","`","¨","°","|","(",")","{","}","[","]","/","\\","<",">","\"","#","0","1","2","3","4","5","6","7","8","9","²","*","+","=","%","µ",";","€","$","¤","£"];
            normal = [];
            for (let i = 0; i < text.length; i++) {
                if(chars.includes(text.charAt(i))){
                    normal.push(true);
                } else {
                    normal.push(false);
                }
            }
            test = true;
            for (let i = 0; i < normal.length - 2; i++) {
                if(normal[i] == true && normal[i+1] == true && normal[i+2] == true ){
                    test = false;
                }
            }
            if(test){
                console.log(new Date().toLocaleString() + " - renommage");
                member.setNickname("trouve toi un pseudo " + Math.round(Math.random()* 999999 ))
            }
        }
    },

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
