var fs = require("fs");
const Discord = require('discord.js');
require("dotenv").config();
module.exports = {

    colGreen : "#2E8B57",
    colRed : "#FF0000",
    colBlue : "#4169E1",
    premierAvril : process.env.BOOL_PREMIER_AVRIL,
    roleMj : process.env.RP_ROLE_MJ,
    salonMj :process.env.RP_SALON_MJ,
    roleMod :process.env.MOD_ROLE,
    logWarnMod : process.env.MOD_WARN_LOG,
    salonMeme : process.env.SALON_MEME,

    async premierAvrilReaction(message){
        await message.react("👍");
        await message.react("👎");
    },

    premierAvrilGetScore(id){
        var users = JSON.parse(fs.readFileSync("data/premierAvril.json"));
        var ret = 0;
        if(users[id] != undefined){
            ret = users[id].score;
        }
        return ret;
    },
    
    premierAvrilGetUpvotes(id){
        var users = JSON.parse(fs.readFileSync("data/premierAvril.json"));
        var ret = 0;
        if(users[id] != undefined){
            ret = users[id].upvotes;
        }
        return ret;
    },

    premierAvrilGetDownvotes(id){
        var users = JSON.parse(fs.readFileSync("data/premierAvril.json"));
        var ret = 0;
        if(users[id] != undefined){
            ret = users[id].downvotes;
        }
        return ret;
    },

    premierAvrilAjoutReaction(reaction, user){

    },

    premierAvrilRetirerReaction(reaction,user){
        
    },

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

    async warn(message,member){
        console.log(new Date().toLocaleString() + " - warn message");
        var texte = message.content;
        var embed = new Discord.MessageEmbed()
        .addField("contenu du message",texte + "\u200B")
        .setFooter("id utilisateur :"  + message.author.id);
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
        //console.log(message.attachments.first());
        var extMessage = embed
        var attachement = new Discord.MessageAttachment("https://images.emojiterra.com/twitter/v13.0/512px/267b.png");
        if(message.attachments.first() != undefined){
            embed.addField("attachement",message.attachments.first().url);
            attachement = new Discord.MessageAttachment(message.attachments.first().url);
            extMessage = {embed,files:[attachement]}
        }
        
        if(member!=null){
            const channel = message.client.channels.cache.get(this.logWarnMod);
            await channel.send(message.author.id, extMessage);
            message.author.send("Votre message a été jugé inaproprié ou non respectueux des regles du salon " + message.channel.toString() + " ou du serveur **AlterHis et Uchronies** par un modérateur.\nCeci n'est qu'un avertissement, cependant en cas de repetition cette infraction sera stockée et poura servir a justifier une sanction.", extMessage);
        } else {
            message.author.send("Le repost hammer est tombé *bonk*", extMessage);
        }
    },

    async messageConfirmation(message, texteAConfirmer) {
        console.log(new Date().toLocaleString() + " - message de confirmation envoyé");
        let ret = false;
        let embed = new Discord.MessageEmbed()
        .addField("actions a confirmer : ", texteAConfirmer + "\u200B")
        .setColor(this.colBlue);
        let msgConfirmation = await message.reply("reagissez ✅ pour confirmer l'action, ou ❌ pour annuler l'action",embed);
        await msgConfirmation.react("✅");
        await msgConfirmation.react("❌");

        const filter = (reaction, user) => {
            return ['✅','❌'].includes(reaction.emoji.name) && user.id == message.author.id;
        };

        await msgConfirmation.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
            .then(collected => {
                console.log(new Date().toLocaleString() + " - message de confirmation réagi");
                //console.log(collected.first()._emoji.name);
                
                if(collected.first()._emoji.name === '✅'){
                    ret = true;
                    embed.setColor(this.colGreen)
                    embed.addField("\u200B","action confirmée")
                } else {
                    ret = false;
                    embed.setColor(this.colRed)
                    embed.addField("\u200B","action annulée par l'utilisateur")
                }
            }).catch(errors => {
                ret = false;
                embed.setColor(this.colRed)
                embed.addField("\u200B","action annulée (timeout)")
            }
        )
        msgConfirmation.edit(embed);
        return ret;
    },

    async messageMJ(message,texteMJ) {
        console.log(new Date().toLocaleString() + " - message mj envoyé");
        let ret = false;
        let embed = new Discord.MessageEmbed()
        .addField("actions a confirmer : ", texteMJ + "\u200B")
        .setColor(this.colBlue);
        const channel = message.client.channels.cache.get(this.salonMj);
        let msgConfirmation = await channel.send(embed);
        await msgConfirmation.react("✅");
        await msgConfirmation.react("❌");

        const filter = (reaction, user) => {
            const guild = message.client.guilds.cache.get(message.guild.id);
            const member = guild.member(user);
            return ['✅','❌'].includes(reaction.emoji.name) && member.roles.cache.some(role => role.id == this.roleMj);
        };

        await msgConfirmation.awaitReactions(filter, { max: 1, time: 604800000, errors: ['time'] })
            .then(collected => {
                console.log(new Date().toLocaleString() + " - message mj réagi");
                if(collected.first()._emoji.name === '✅'){
                    ret = true;
                    embed.setColor(this.colGreen)
                    embed.addField("\u200B","action confirmée par <@" + collected.first().users.cache.last() +">")
                } else {
                    ret = false;
                    embed.setColor(this.colRed)
                    embed.addField("\u200B","action annulée par <@" + collected.first().users.cache.last() +">")
                }
            }).catch(errors => {
                ret = false;
                embed.setColor(this.colRed)
                embed.addField("\u200B","action annulée(timeout)")
            }
        )
        msgConfirmation.edit(embed);
        return ret;
    },

    regexStat(texte,stats,nbcase,PM){
        if(stats){
            if (texte.match(/[Aa][Rr][Mm][EeÉé][Ee]?[Ss]?/)) {
                return "armee";
            }
            if (texte.match(/[Mm][Aa][Rr][Ii][Nn][Ee][Ss]?/)) {
                return "marine";
            }
            if (texte.match(/[Ss][Cc]?[Ii][Ee][Nn][Cc]?[Ss]?[Ee][Ss]?/)) {
                return "science";
            }
            if (texte.match(/[Cc][Uu][Ll][Tt][Uu][Rr][Ee]?[Ss]?/)) {
                return "culture";
            }
            if (texte.match(/[Rr][Ee][Ll][Ii][Gg][Ii][Oo][Nn][Ss]?/)) {
                return "religion";
            }
            if (texte.match(/[Ee][Cc][Oo][Nn][Oo][Mm][Ii][Ee]?[Ss]?/)) {
                return "economie";
            }
        }
        if(nbcase){
            if (texte.match(/[Nn]?[Bb]?[Cc][Aa][Ss][Ee][Ss]?/)) {
                return "nbCases";
            } 
        }
        if(PM){
            if (texte.match(/([Pp][Mm])|([Pp][Oo][Ii][Nn][Tt]?[Ss] ?([Dd][Ee])? ?[Mm][Oo][Uu][Vv][Ee][Mm][Ee][Nn][Tt]?[Ss]?)/)) {
                return "PM";
            } 
        }
        return false;
    },

    faitPartieDuRp(idJoueur){
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        return joueurs[idJoueur] != undefined ;
    },

    villeAppartiens(idJoueur, idVille){
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        return global.villes[idVille].proprietaire == idJoueur;
    },

    villeExiste(idVille){
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        return global.villes[idVille] != undefined
    },

    provinceAppartiens(idJoueur, idProvince){
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        return global.provinces[idProvince].proprietaire == idJoueur;
    },

    provinceExiste(idProvince){
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        return global.provinces[idProvince] != undefined
    },

    villeDansProvince(idVille, idProvince){
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        return global.provinces[idProvince].villes.includes(idVille);
    },

    rechercheExiste(idRecherche){
        var param = JSON.parse(fs.readFileSync("data/param.json"));
        return param.recherche[idRecherche] != undefined;
    },

    recherchePossible(idJoueur, idRecherche){
        var param = JSON.parse(fs.readFileSync("data/param.json"));
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        return param.recherche[idRecherche].science <= joueurs[idJoueur].science && param.recherche[idRecherche].culture <= joueurs[idJoueur].culture ;
    },

    infGlobal(idJoueur){
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        var ret = []
        for (var idInfluenceur in joueurs){
            ret[idInfluenceur] = this.infVillesJoueur(idJoueur, idInfluenceur);
        }
        return ret;
    },

    infVillesJoueur(idJoueur,idInfluenceur){
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        var quantite = 0;
        for (var ville in global.villes){
            if(global.villes[ville].proprietaire == idJoueur){
                if(global.villes[ville].influence[idInfluenceur] != undefined){
                    quantite = quantite + global.villes[ville].influence[idInfluenceur]
                }
            }
        }
        return quantite
    }



};