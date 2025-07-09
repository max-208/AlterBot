const Discord = require('discord.js');
const fs = require('fs');
require("dotenv").config();
module.exports = {

    colGreen : "#2E8B57",
    colRed : "#FF0000",
    colBlue : "#4169E1",
    allowedConfigProperties : [
        "numberRepostReaction",
        "channelSondage",
        "channelMeme",
        "roleMod",
        "logWarnMod"
    ],

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

    config : {
        "numberRepostReaction": 5,
        "channelSondage": process.env.CHANNEL_SONDAGE ?? "522437669582667787",
        "channelMeme": process.env.SALON_MEME,
        "roleMod": process.env.MOD_ROLE,
        "logWarnMod": process.env.MOD_WARN_LOG
    },

    async readConfig() {
        return new Promise((resolve, reject) => {
            fs.access('config.json', fs.constants.F_OK, (err) => {
                if (err) {
                    fs.writeFileSync("config.json", "{}");
                    fs.access('config.json', fs.constants.F_OK, (err) => {
                        if (err) console.error('Could not read nor create the config file');
                        else resolve(undefined);
                    });
                }
            });
            fs.readFile('config.json', 'utf8', (err, data) => {
                if (err) reject(err);
                else {
                    try {
                        const config = JSON.parse(data);
                        resolve(config);
                    } catch (parseError) {
                        reject(parseError);
                    }
                }
            })

        });
    },

    async configFromDisk() {
        this.readConfig().then(config => {
            if (config) {
                for (let key in config) {
                    if (this.allowedConfigProperties.includes(key)) {
                        this.config[key] = config[key];
                    }
                }
            }
        }).catch(err => {
            console.error('Error reading config file:', err);
        })
    },

    async syncConfig() {
        fs.writeFile('config.json', JSON.stringify(this.config, null, 4), (err) => {
            if (err) console.error('Could not write config file:', err);
        })
    }
};
