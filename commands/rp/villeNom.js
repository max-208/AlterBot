var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'villenom',
    description: 'renommes une ville',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{id ville}> <{nouveau nom}...>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        console.log(new Date().toLocaleString() + " - ville nom");
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        if (global.villes[args[0]] != undefined) {
            if (global.villes[args[0]].proprietaire == message.author.id) {
                if (args[1] != undefined) {
                    if (await utilites.messageConfirmation(message, "- changement de nom : " + global.villes[args[0]].nom + " -> "  + args.slice(1).join(" ") + " \" pour <@" + message.author.id + ">" )) {
                        console.log(new Date().toLocaleString() + " - ville nom confirmation");
                        if (await utilites.messageMJ("- changement de nom : " + global.villes[args[0]].nom + " -> "  + args.slice(1).join(" ") )) {
                            console.log(new Date().toLocaleString() + " - ville nom confirmation mj");
                            global.villes[args[0]].nom = args.slice(1).join(" ");
                            var retour2 = JSON.stringify(global, null, 2);
                            fs.writeFileSync('data/global.json', retour2);
                        }
                    }
                } else {
                    message.reply("deuxième argument incorrect : donnez un nom pour la ville");
                }
            } else {
                message.reply("premier argument incorrect : cette ville ne t'appartiens pas")
            }
        } else {
            message.reply("premier argument incorrect : cette ville n'existe pas")
        }

    },
};