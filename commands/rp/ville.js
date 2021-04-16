var fs = require("fs");
const Discord = require('discord.js');

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

        if (args[0].match(/[Ii][Mm][Pp][Rr][Oo][Vv][Ee]/)) {
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

        } else {
            message.reply("premier argument incorrect : valeurs attendues \n `buy, edit, improve, influence`");
        }
    },
};