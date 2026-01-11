const Discord = require('discord.js');
const fs = require('fs');
const sharp = require("sharp");
const CONFIG_PATH = 'config/config.json';
module.exports = {

    colGreen : "#2E8B57",
    colRed : "#FF0000",
    colBlue : "#4169E1",

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
            const channelWarnMod = await this.readConfig("channelWarnMod");
            message.client.channels.fetch(channelWarnMod).then(channel => {;
                channel.send({embeds:[embed], content : message.author.id});});
            message.author.send({embeds:[embed], content : "Votre message a été jugé inaproprié ou non respectueux des regles du salon " + message.channel.toString() + " ou du serveur **AlterHis et Uchronies** par un modérateur.\nCeci n'est qu'un avertissement, cependant en cas de repetition cette infraction sera stockée et poura servir a justifier une sanction." });
        } else {
            message.author.send({embeds:[embed], content :"Le repost hammer est tombé *bonk*"});
        }
    },

    defaultConfig : {
        //général
        "roleMod": "476422844180332544",
        
        // reposts
        "channelMeme": "476826071489052695",
        "repostNumberReaction": 5,

        // warns mod
        "channelWarnMod": "842831533693468683",
        "warnNumberReaction": 1,

        //sondage
        "channelSondage": "522437669582667787",

        //redirection
        "redirectionTimeoutMinutes" : 3,

        wordleExternalScaling : 1,
        wordleInternalAdjustment : 30,
        wordleMagic1 : 2,
        wordleMagic2 : 2/this.wordleMagic1,
        wordleBaseHour : 20,
        wordleBaseMinute : 0,
        wordleFrequency : 1
    },
    allowedConfigProperties : [
        "roleMod",
        "channelMeme",
        "repostNumberReaction",
        "channelWarnMod",
        "warnNumberReaction",
        "channelSondage",
        "redirectionTimeoutMinutes",
        "wordleExternalScaling",
        "wordleInternalAdjustment",
        "wordleMagic1",
        "wordleMagic2",
        "wordleBaseHour",
        "wordleBaseMinute",
        "wordleFrequency"
    ],

    deletionList : {}, // of type personId : [channelId, channelId..]

    async deletionHook(message) {
        if (message.author.id in this.deletionList && this.deletionList[message.author.id].includes(message.channel.id)) {
            await message.author.send("Votre message dans le salon " + message.channel.toString() + " a été supprimé car vous êtes sous la sanction d'une redirection !")
            message.delete().catch(error => {
                console.error('Error deleting message on deletion hook:', error);
            });
        }
    },

    async registerUserForDeletionHook(userId, channelId, time) {
        if (!(userId in this.deletionList)) {
            this.deletionList[userId] = [channelId];
        } else {
            this.deletionList[userId].push(channelId);
        }
        setTimeout(this.removeUserFromDeletionHook.bind(this), time * 60 * 1000, userId, channelId);
    },

    async removeUserFromDeletionHook(userId, channelId) {
        const index = this.deletionList[userId].indexOf(channelId);
        if (index !== -1) {
            this.deletionList[userId].splice(index, 1);
        }
        if (this.deletionList[userId].length === 0) {
            delete this.deletionList[userId];
        }
    },

    async initConfigIfEmpty() {
        try {
            const config = await this.readConfig();
            if (Object.keys(config).length === 0) {
                console.log('Config file is empty, initializing with default values.');
                await this.writeConfig(this.defaultConfig);
            } else {
                for (const key of Object.keys(this.config)) {
                    if (!Object.keys(config).includes(key)) {
                        config[key] = this.config[key];
                    }
                }
                await this.writeConfig(config);
                console.log('Config file loaded successfully.');
            }
        } catch (error) {
            console.error('Error reading config file');
            console.log('Creating new config file with default values.');
            await this.writeConfig(this.defaultConfig);
        }
    },

    cachedConfig : null,
    cachedConfigDate : null,
    async readConfig() {
        const cacheDuration = 1000 * 60 * 60 * 24; // 1 jour
        if (this.cachedConfig && this.cachedConfigDate && (Date.now() - this.cachedConfigDate < cacheDuration)) {
            return this.cachedConfig;
        }
        this.cachedConfig = await this.readConfigNoCache();
        this.cachedConfigDate = Date.now();
        return this.cachedConfig;
    },

    async readConfigProperty(key) {
        if (!this.allowedConfigProperties.includes(key)) {
            console.error("Access to invalid config property: " + key)
        }
        let config = await this.readConfig();
        return config[key];
    },

    async readConfigNoCache() {
        return new Promise((resolve, reject) => {
            fs.readFile(CONFIG_PATH, 'utf8', (err, data) => {
                if (err) reject(err);
                else {
                    try {
                        const config = JSON.parse(data);
                        if (!config) {
                            reject(new Error('Config file is empty or invalid'));
                        }
                        badKeys = [];
                        for (let key in config) {
                            if (!this.allowedConfigProperties.includes(key)) {
                                badKeys.push(key);
                            }
                        }
                        if (badKeys.length > 0) {
                            console.warn(`Config file contains unknown keys: ${badKeys.join(', ')}`);
                            reject(new Error(`Config file contains unknown keys: ${badKeys.join(', ')}`));
                        }
                        resolve(config);
                    } catch (parseError) {
                        reject(parseError);
                    }
                }
            })
        });
    },

    async writeConfig(config) {
        fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 4), (err) => {
            if (err) console.error('Could not write config file:', err);
        })
        this.cachedConfig = config;
        this.cachedConfigDate = Date.now();
    },

    async updateConfig(key, value) {
        try {
            let config = await this.readConfig();
            if (!this.allowedConfigProperties.includes(key)) {
                throw new Error(`Invalid config key: ${key}`);
            }
            config[key] = value;
            await this.writeConfig(config);
        } catch (error) {
            console.error('Error updating config:', error);
        }
    },

    async convertSVGtoPNG(svgString) {
        if (!fs.existsSync("tmp")){
            fs.mkdirSync("tmp");
        }
        const epoch = new Date().getTime();
        await sharp(Buffer.from(svgString))
            .png()
            .toFile('tmp/tmp_' + epoch + '.png');
        return 'tmp_' + epoch + '.png';
    },

    async deleteFiles(fileList) {
        for (const file of fileList){
            const filePath = 'tmp/' + file;
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                    }
                });
            }
        }

    }


};
