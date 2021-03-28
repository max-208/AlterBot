var fs = require("fs");
const Discord = require('discord.js');
module.exports = {
    name: 'infoVille',
    description: 'info sur les villes d\'un joueur ou sur une ville en particulier',
    args: false, 				//mettre a true quand la commande nécésite des arguments
    usage: '[{mention joueur}|{id ville}]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: ["infoville","infovilles","infoVilles"],	//autres manières d'appeler la commande
    execute(message, args) {
        var userid = message.author.id;
        var idVille = 0;
        if (args[0] != undefined) {
            if (args[0].match(/<@!?(\d+)>/)) {
                userid = message.mentions.users.first().id;
            } else {
                idVille = args[0];
            }
        }
        var embed;
        if (idVille != 0) {
            var global = JSON.parse(fs.readFileSync("data/global.json"));
            if (global.villes[idVille] != undefined) {
                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(':city_sunset: Info ville ' + idVille + " - " + global.villes[idVille].nom);

                embed.addField("nom", global.villes[idVille].nom, true);
                embed.addField("proprietaire", "<@" + global.villes[idVille].proprietaire + ">", true);

                if (global.villes[idVille].province == 0 || global.villes[idVille].province > Object.keys(global.provinces).length) {
                    embed.addField("province", "aucune province", true);
                } else {
                    embed.addField("province", global.villes[idVille].province + " - " + global.provinces[global.villes[idVille].province].nom, true);
                }

                var sommeReligion = 0;
                for (var i in global.villes[idVille].infReligion) {
                    sommeReligion = sommeReligion + global.villes[idVille].infReligion[i];
                }
                var texteReligion = "\u200b";
                for (var i in global.villes[idVille].infReligion) {
                    texteReligion = texteReligion + global.villes[idVille].infReligion[i] + " / " + sommeReligion + " - <@" + i + ">\n"
                }
                //console.log(texteReligion)
                embed.addField("Influence religieuse", texteReligion, true);


                var sommeEconomie = 0;
                for (var i in global.villes[idVille].infEconomie) {
                    sommeEconomie = sommeEconomie + global.villes[idVille].infEconomie[i];
                }
                var texteEconomie = "\u200b";
                for (var i in global.villes[idVille].infEconomie) {
                    texteEconomie = texteEconomie + global.villes[idVille].infEconomie[i] + " / " + sommeEconomie + " - <@" + i + ">\n"
                }
                //console.log(texteEconomie)
                embed.addField("Influence economique", texteEconomie, true);


                var param = JSON.parse(fs.readFileSync("data/param.json"));

                var texteFeatures = "\u200b";
                if (global.villes[idVille].features != undefined) {
                    for (var i in global.villes[idVille].features) {
                        var indexFeature = global.villes[idVille].features[i]
                        if (param.feature[indexFeature] != undefined) {
                            texteFeatures = texteFeatures + indexFeature + " - " + param.feature[indexFeature].nom + "\n"
                        } else {
                            texteFeatures = texteFeatures + indexFeature + " - \n"
                        }
                    }
                } else {
                    texteFeatures = "aucune améliorations"
                }

                embed.addField("Ameliorations de la ville", texteFeatures, false);

                message.channel.send(embed);

            } else {
                message.reply("deuxième argument incorrect : cette ville n'existe pas")
            }
        } else {
            var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
            if (joueurs[userid] != undefined) {
                embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Info villes de ' + message.author.username);

                var global = JSON.parse(fs.readFileSync("data/global.json"));

                var dicTexte = { "0": "\u200b" };
                for (var i in joueurs[userid].provinces) {
                    dicTexte[joueurs[userid].provinces[i]] = "\u200b";
                }

                for (var i in joueurs[userid].villes) {
                    var indVille = parseInt(joueurs[userid].villes[i]);
                    dicTexte[global.villes[joueurs[userid].villes[i]].province] = dicTexte[global.villes[joueurs[userid].villes[i]].province] + joueurs[userid].villes[i] + " - " + global.villes[joueurs[userid].villes[i]].nom + "\n";
                }

                var titre = "\u200b"
                for (var i in dicTexte) {
                    if (i == 0) {
                        titre = "aucune province"
                    } else if (global.provinces[i] != undefined) {
                        titre = i + " - " + global.provinces[i].nom;
                    } else {
                        titre = i + " - ";
                    }
                    embed.addField(titre, dicTexte[i], true);
                }

                message.channel.send(embed);

            } else {
                message.reply("deuxième argument incorrect : ce joueur ne participe pas au rp")
            }

        }


    },
};