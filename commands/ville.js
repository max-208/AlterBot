var fs = require("fs");
const Discord = require('discord.js');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

module.exports = {
    name: 'ville',
    description: 'achete, modifie ou ameliore une ville',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<buy(1)|edit(2)|improve(3)|influence(4)|list(5)> [{mention}(5)|{idVille}(5)] <{nom de la nouvelle ville}(1)|{id de la ville}(2,3,4)> <{nouveau nom}(2)|{id de l\'amelioration}(3)|{religion|economie}(4)> <combien d\'influence(4)>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    execute(message, args) {
        const prixAchat = 5;
        const prixImprovement = 2;

        if (args[0].match(/[Bb][Uu][Yy]/)) {
            if (args[1] != undefined) {
                const userid = message.author.id;
                var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                if (joueurs[userid] != undefined) {
                    if (joueurs[userid].PM >= prixAchat) {
                        joueurs[userid].PM = parseInt(joueurs[userid].PM) - prixAchat
                        var global = JSON.parse(fs.readFileSync("data/global.json"));
                        const idVille = Object.keys(global.villes).length + 1;
                        console.log(idVille);
                        var jsonObj = {};
                        jsonObj[userid] = 1;
                        global.villes[idVille] = { "nom": args[1], "proprietaire": userid, "province": 0, "infReligion": jsonObj, "infEconomie": jsonObj, "features": [] };
                        joueurs[userid].villes = joueurs[userid].villes.concat([idVille]);
                        var retour1 = JSON.stringify(joueurs, null, 2);
                        fs.writeFileSync('data/joueurs.json', retour1);
                        var retour2 = JSON.stringify(global, null, 2);
                        fs.writeFileSync('data/global.json', retour2);
                        message.react("✅");
                    } else {
                        message.reply("vous n'avez pas assez de PM pour cela, il vous manque :zap: **" + (prixAchat - parseInt(joueurs[userid].PM, 10)) + "** !")
                    }
                } else {
                    message.reply("erreur : vous ne faites pas partie du rp")
                }
            } else {
                message.reply("deuxième argument incorrect : donnez un nom pour la ville");
            }


        } else if (args[0].match(/[Ee][Dd][Ii][Tt]/)) {
            var global = JSON.parse(fs.readFileSync("data/global.json"));
            if (global.villes[args[1]] != undefined) {
                if (global.villes[args[1]].proprietaire == message.author.id) {
                    if (args[2] != undefined) {
                        global.villes[args[1]].nom = args[2];
                        var retour2 = JSON.stringify(global, null, 2);
                        fs.writeFileSync('data/global.json', retour2);
                        message.react("✅");
                    } else {
                        message.reply("troixième argument incorrect : donnez un nom pour la ville");
                    }
                } else {
                    message.reply("deuxième argument incorrect : cette ville ne t'appartiens pas")
                }
            } else {
                message.reply("deuxième argument incorrect : cette ville n'existe pas")
            }



        } else if (args[0].match(/[Ii][Mm][Pp][Rr][Oo][Vv][Ee]/)) {
            var global = JSON.parse(fs.readFileSync("data/global.json"));
            if (global.villes[args[1]] != undefined) {
                if (global.villes[args[1]].proprietaire == message.author.id) {
                    var param = JSON.parse(fs.readFileSync("data/param.json"));
                    if (param.feature[args[2]] != undefined) {
                        if (!global.villes[args[1]].features.includes(parseInt(args[2]))) {
                            var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                            if (joueurs[message.author.id] != undefined) {
                                const userid = message.author.id;
                                if (joueurs[userid].PM >= prixImprovement) {
                                    if(joueurs[message.author.id].technologies.includes(param.feature[args[2]].reqTech) && joueurs[message.author.id].cultures.includes(param.feature[args[2]].reqCult)){
                                        joueurs[message.author.id].PM = joueurs[message.author.id].PM - prixImprovement;
                                        global.villes[args[1]].features = global.villes[args[1]].features.concat([parseInt(args[2])]);
                                        var retour1 = JSON.stringify(joueurs, null, 2);
                                        fs.writeFileSync('data/joueurs.json', retour1);
                                        var retour2 = JSON.stringify(global, null, 2);
                                        fs.writeFileSync('data/global.json', retour2);
                                        message.react("✅");
                                    } else {
                                        message.reply("troisième argument incorrect : vous ne possedez pas la tech/culture necessaire pour cet amenagement")
                                    }
                                } else {
                                    message.reply("vous n'avez pas assez de PM pour cela, il vous manque :zap: **" + (prixImprovement - parseInt(joueurs[userid].PM, 10)) + "** !")
                                }
                            } else {
                                message.reply("erreur : vous ne faites pas partie du rp")
                            }
                        } else {
                            message.reply("troisième argument incorrect : cette ville possède deja cet amenagement")
                        }
                    } else {
                        message.reply("troisième argument incorrect : cet amenagement n'existe pas")
                    }
                } else {
                    message.reply("deuxième argument incorrect : cette ville ne t'appartiens pas")
                }
            } else {
                message.reply("deuxième argument incorrect : cette ville n'existe pas")
            }

        } else if (args[0].match(/[Ii][Nn][Ff][Ll][Uu][Ee][Nn][Cc][Ee]/)) {
            console.log("4");
            message.reply("cette fonctionalité arrive bientot !")

        } else if (args[0].match(/[Ll][Ii][Ss][Tt][Ee]?/)) {
            var userid = message.author.id;
            var idVille = 0;
            if (args[1] != undefined) {
                if (args[1].match(/<@!?(\d+)>/)) {
                    userid = message.mentions.users.first();
                } else {
                    idVille = args[1];
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
                        console.log(i + " - " + indVille);
                        //la ligne au dessous bug :O
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


        } else {
            message.reply("premier argument incorrect : valeurs attendues \n `buy, edit, improve, influence, list`");
        }
    },
};