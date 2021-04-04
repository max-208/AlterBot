var fs = require("fs");
const Discord = require('discord.js');
module.exports = {

    colGreen : "#2E8B57",
    colRed : "#FF0000",
    colBlue : "#4169E1",

    async messageConfirmation(message, texteAConfirmer, userid, time) {
        if(userid == "" || texteAConfirmer == "" || time <=0){
            message.reply("erreur lors de l'execution du message de confirmation" + userid == "" + " " + texteAConfirmer == "" + " " + time <=0)
            return false;
        }
        
        let ret = false;
        let embed = new Discord.MessageEmbed()
        .addField("actions a confirmer : ", texteAConfirmer + "\u200B")
        .setDescription("<@" + userid + "> reagissez ✅ pour confirmer l'action, ou ❌ pour annuler l'action")
        .setColor(this.colBlue);
        let msgConfirmation = await message.reply(embed);
        await msgConfirmation.react("✅");
        await msgConfirmation.react("❌");

        const filter = (reaction, user) => {
            return ['✅','❌'].includes(reaction.emoji.name) && user.id == userid;
        };

        await msgConfirmation.awaitReactions(filter, { max: 1, time: time, errors: ['time'] })
            .then(collected => {
                //console.log(collected);
                //console.log(collected.first());

                console.log(collected.first()._emoji.name);
                if(collected.first()._emoji.name === '✅'){
                    ret = true;
                    embed.setColor(this.colGreen)
                } else {
                    ret = false;
                    embed.setColor(this.colRed)
                }
            }).catch(errors => {
                ret = false;
                embed.setColor(this.colRed)
            }
        )
        msgConfirmation.edit(embed);
        console.log(ret);
        return ret;
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