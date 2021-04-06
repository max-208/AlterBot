var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'drapeau',
    description: 'Change l\'url du drapeau',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{nouvelle url du drapeau}...>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        if (utilites.faitPartieDuRp(message.author.id)) {
            if (args[0].match(/^https?:\/\/.*\.(?:png|PNG|jpg|jpeg|JPG|JPEG|gif|webp)/) != undefined) {
                if (await utilites.messageConfirmation(message, "- nouveau drapeau : " + args[0], [message.author.id])) {
                    joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                    joueurs[message.author.id].drapeau = args[0];
                    let retour = JSON.stringify(joueurs, null, 2);
                    fs.writeFileSync('data/joueurs.json', retour);
                }
            } else {
                message.reply("ce n'est pas une image adaptée");
            }
        } else {
            message.reply("vous ne faites pas partie du rp :0");
        }

    },
};