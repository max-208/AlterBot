var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'ajouterennemi',
    description: 'ajoute un ennemi a la liste d\'ennemis',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{mention joueur}>...',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        console.log(new Date().toLocaleString() + " - ajout ennemi");
        if (utilites.faitPartieDuRp(message.author.id)) {
            if (message.content.match(/<@!?(\d+)>/)) {
                users = message.mentions.users.array(); //TODO : ne fonctionne plus
                if (await utilites.messageConfirmation(message, "- ajouter aux ennemis : " + args.join(", "))) {
                    console.log(new Date().toLocaleString() + " - ajout ennemi confirmation");
                    joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                    for(user in users){
                        if(!joueurs[message.author.id].ennemis.includes(users[user].id)){
                            joueurs[message.author.id].ennemis = joueurs[message.author.id].ennemis.concat([users[user].id]);
                        }
                    }
                    let retour = JSON.stringify(joueurs, null, 2);
                    fs.writeFileSync('data/joueurs.json', retour);
                }
            } else {
                message.reply("veuillez mentionner un joueur ou plus")
            }
        } else {
            message.reply("vous ne faites pas partie du rp :0");
        }

    },
};