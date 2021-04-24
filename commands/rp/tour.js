var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'tour',
    description: 'passer un tour',
    args: false, 				//mettre a true quand la commande nécésite des arguments
    usage: '[{quantité de PM}]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	    //autres manières d'appeler la commande
    permissions: "MANAGE_MESSAGES",
    execute(message, args) {
        console.log(new Date().toLocaleString() + " - tour initié par " + message.author.username);
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        var quantite = 5;
        if(args[0] != undefined){
            quantite = parseInt(args[0]);
        }

        if(utilites.messageConfirmation(message,"- nouveau tour, " + quantite + " PM pour tout le monde")){
            console.log(new Date().toLocaleString() + " - tour confirmation");
            for(i in joueurs){
                joueurs[i].PM = parseInt(joueurs[i].PM + quantite);
            }

            let retour = JSON.stringify(joueurs, null, 2);
            fs.writeFileSync('data/joueurs.json', retour);
        }
    },
};
