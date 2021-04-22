var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'provincenom',
    description: 'renommes une province',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{id province}> <{nouveau nom}...>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        var idProvince = args[0];
        var nom = args.splice(1).join(" ");
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        if (global.provinces[idProvince] != undefined) {
            if (global.provinces[idProvince].proprietaire == message.author.id) {
                if (nom != undefined) {
                    if(utilites.messageConfirmation(message,"- renommage de province (" + idProvince + ") " + global.provinces[args[0]].nom + " -> " + nom)){
                        global.provinces[args[0]].nom = args.slice(2).join(" ");
                        var retour2 = JSON.stringify(global, null, 2);
                        fs.writeFileSync('data/global.json', retour2);
                    }
                } else {
                    message.reply("deuxième argument incorrect : donnez un nom pour la province");
                }
            } else {
                message.reply("premier argument incorrect : cette province ne t'appartiens pas")
            }
        } else {
            message.reply("premier argument incorrect : cette province n'existe pas")
        }
    },
};