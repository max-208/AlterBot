var fs = require("fs");
const Discord = require('discord.js');
module.exports = {
    name: 'info',
    description: 'affiche les infos sur vous meme ou bien un joueur',
    args: false, 				//mettre a true quand la commande nécésite des arguments
    usage: '[{mention utilisateur}]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	    //autres manières d'appeler la commande
    //permissions: "",
    execute(message, args) {
        console.log(new Date().toLocaleString() + " - info");
        var user;
        if (message.content.match(/<@!?(\d+)>/)){
            user = message.mentions.users.first()
        } else {
            user = message.author
        }

        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        var embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Statistiques de ' + user.username)
        let userId = user.id;
        let dataUser = joueurs[userId]
        if(dataUser != undefined){

            if(dataUser.drapeau !=  null && dataUser.drapeau != ""){
                embed.setThumbnail(dataUser.drapeau);
            } else {
                embed.setThumbnail(user.displayAvatarURL());
            }

            
            embed.addField("Nom du pays", dataUser.pays||"aucun nom", true);
            embed.addField("Regime politique", "__" + (dataUser.regime||"aucun regime") + "__", true);
            embed.addField("Devise", "*" + (dataUser.devise||"aucune devise") + "*", true);
            
            if(dataUser.suzerain != null && dataUser.suzerain != ""){
                embed.addField("Suzerain", "<@" + dataUser.suzerain + ">", false);
            }

            embed.addField("\u200b", "\u200b", false);

            embed.addField("------Points de mouvement------", ":zap: " + dataUser.PM||"erreur", false);

            embed.addField("Armee", ":dart: " + dataUser.armee||"erreur", true);
            embed.addField("Marine", ":anchor: " + dataUser.marine||"erreur", true);
            embed.addField("Economie", ":moneybag: " + dataUser.economie||"erreur", true);
            
            embed.addField("Religion", ":pray: " + dataUser.religion||"erreur", true);
            embed.addField("Culture", ":books: " + dataUser.culture||"erreur", true);
            embed.addField("Science", ":microscope: " + dataUser.science||"erreur", true);

            embed.addField("nb cases", ":mount_fuji: " + dataUser.nbCases||"erreur", true);
            if(dataUser.villes != undefined){
                embed.addField("nb villes", ":city_sunset: " + dataUser.villes.length||"erreur", true);
            } else {
                embed.addField("nb villes", ":city_sunset: " + "erreur", true);
            }
            if(dataUser.provinces != undefined){
                embed.addField("nb provinces", ":large_blue_diamond: " + dataUser.provinces.length||"0", true);
            } else {
                embed.addField("nb provinces", ":large_blue_diamond: "  + "erreur", true);
            }

            embed.addField("\u200b", "\u200b", false);
            
            var allies = "\u200b";
            if(dataUser.allies == null || dataUser.allies == undefined || dataUser.allies.length == 0){
                allies = "aucun allies";
            } else {
                for(var i = 0; i < dataUser.allies.length; i++) {
                    allies = allies + "<@" + dataUser.allies[i] + ">\n";
                }
            }
            embed.addField("Allies", allies, true);

            var ennemis = "\u200b";
            if(dataUser.ennemis == null || dataUser.ennemis == undefined || dataUser.ennemis.length == 0){
                ennemis = "aucun ennemis";
            } else {
                for(i = 0; i < dataUser.ennemis.length; i++) {
                    ennemis = ennemis + "<@" + dataUser.ennemis[i] + ">\n";
                }
            }
            embed.addField("Ennemis", ennemis, true);

            var vassaux = "\u200b";
            if(dataUser.vassaux == null || dataUser.vassaux == undefined || dataUser.vassaux.length == 0){
                vassaux = "aucun vassaux";
            } else {
                for(i = 0; i < dataUser.vassaux.length; i++) {
                    vassaux = vassaux + "<@" + dataUser.vassaux[i] + ">\n";
                }
            }
            embed.addField("Vassaux", vassaux, true);

            /*
            var organisations = "\u200b";
            if(dataUser.organisations == null || dataUser.organisations == undefined || dataUser.organisations.length == 0){
                organisations = "aucune organisations";
            } else {
                for(i = 0; i < dataUser.organisations.length; i++) {
                    if(global.organisations[dataUser.organisations[i]] != null||global.organisations[dataUser.organisations[i]] != undefined){
                        organisations = organisations + dataUser.organisations[i] + " - " + global.organisations[dataUser.organisations[i]].nom + "\n";
                    } else {
                        organisations = organisations + dataUser.organisations[i] + " - \n";
                    }
                }
            }
            embed.addField("Organisations", organisations, true);
            */

            message.channel.send(embed);

        } else {
            message.channel.send("je n'ai aucune information sur " + user.username + " :0");
        }

    },
};
