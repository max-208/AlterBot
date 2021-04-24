var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'villecreer',
    description: 'crees une ville',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{nom de la ville}...> \\n [{commentaire mj}...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        const prixAchat = 5;
        var nomVille = message.content.split("\n")[0].split(" ").slice(1).join(" ");
        var commentaire = message.content.split("\n")[1]||" ";

        const userid = message.author.id;
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        if (joueurs[userid] != undefined) {
            if (joueurs[userid].PM >= prixAchat) {
                //confirmation joueur
                if (await utilites.messageConfirmation(message, "- creation de la ville " + nomVille + "\n- dépense de :zap: " + prixAchat)){
                    joueurs[userid].PM = parseInt(joueurs[userid].PM) - prixAchat;
                    var retour1 = JSON.stringify(joueurs, null, 2);
                    fs.writeFileSync('data/joueurs.json', retour1);
                    //confirmation mj
                    if(await utilites.messageMJ(message,"- creation de ville : " + nomVille + "\n- commentaire : *" + commentaire + "*")){
                        var global = JSON.parse(fs.readFileSync("data/global.json"));
                        const idVille = Object.keys(global.villes).length + 1;
        
                        var jsonObj = {};
                        jsonObj[userid] = 1;
                        global.villes[idVille] = { "nom": nomVille, "proprietaire": userid, "province": 0, "influence": jsonObj, "features": [] };
                        joueurs[userid].villes = joueurs[userid].villes.concat([idVille]);
                        
                        var retour2 = JSON.stringify(global, null, 2);
                        fs.writeFileSync('data/global.json', retour2);
                        
                    } else {
                        joueurs[userid].PM = parseInt(joueurs[userid].PM) + prixAchat;
                    }

                    var retour1 = JSON.stringify(joueurs, null, 2);
                        fs.writeFileSync('data/joueurs.json', retour1);
                }
            } else {
                message.reply("vous n'avez pas assez de PM pour cela, il vous manque :zap: **" + (prixAchat - parseInt(joueurs[userid].PM, 10)) + "** !")
            }
        } else {
            message.reply("erreur : vous ne faites pas partie du rp")
        }


    },
};