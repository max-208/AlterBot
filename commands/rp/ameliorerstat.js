var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'ameliorerstat',
    description: 'ameliore une des statistiques en dépensant un PM',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{stat (armee|marine|science|culture|religion|economie)}> <{quantité (1-)}>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        let prix = 1;

        let stat = utilites.regexStat(args[0],true,false,false);
        let quantite = parseInt(args[1], 10);
        if (stat != false) {
            if (quantite > 0) {
                if (utilites.faitPartieDuRp(message.author.id)) {
                    var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                    let dataUser = joueurs[message.author.id];
                    if (dataUser["PM"] >= (quantite * prix)) {
                        if(await utilites.messageConfirmation(message,"- achat de " + quantite + " stat de " + stat + "\n- depense de :zap: " + (quantite * prix))){
                            dataUser[stat] = parseInt(dataUser[stat], 10) + quantite;
                            dataUser["PM"] = parseInt(dataUser["PM"], 10) - quantite * prix;
    
                            let retour = JSON.stringify(joueurs, null, 2);
                            fs.writeFileSync('data/joueurs.json', retour);
                        }
                    } else {
                        message.reply("vous n'avez pas assez de PM pour cela, il vous manque :zap: **" + (quantite * prix - parseInt(dataUser["PM"], 10)) + "** !")
                    }
                } else {
                    message.reply("vous ne faites pas partie du rp :0");
                }
            } else {
                message.reply("quantité non correcte : la quantité doit etre positive");
            }
        } else {
            message.reply("Statistique incorrecte : choix acceptés \n `armee, marine, science, culture, religion, economie` ")
        }
    },
};