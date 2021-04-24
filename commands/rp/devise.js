var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'devise',
    description: 'Change la devise du pays',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{nouvelle devise}...>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        console.log(new Date().toLocaleString() + " - changement de devise");
        if (utilites.faitPartieDuRp(message.author.id)) {
            if (await utilites.messageConfirmation(message, "- nouvelle devise : " + args.join(" "))) {
                joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                joueurs[message.author.id].devise = args.join(" ");
                let retour = JSON.stringify(joueurs, null, 2);
                fs.writeFileSync('data/joueurs.json', retour);
            }
        } else {
            message.reply("vous ne faites pas partie du rp :0");
        }

    },
};