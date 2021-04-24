var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'enleverallie',
    description: 'enleve un allié de la liste d\'alliés',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{mention joueur}>...',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        console.log(new Date().toLocaleString() + " - enlever allie");
        if (utilites.faitPartieDuRp(message.author.id)) {
            if (message.content.match(/<@!?(\d+)>/)) {
                users = message.mentions.users.array();
                if (await utilites.messageConfirmation(message, "- enlever des alliés : " + args.join(", "), [message.author.id])) {
                    console.log(new Date().toLocaleString() + " - enlever allie confirmation");
                    joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                    for(user in users){
                        if(joueurs[message.author.id].allies.includes(users[user].id)){
                            joueurs[message.author.id].allies = joueurs[message.author.id].allies.filter(function(value, index, arr){ 
                                return value != users[user].id;
                            });
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