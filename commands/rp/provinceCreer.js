var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'provincecreer',
    description: 'crees une province',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{nom de la province}...>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        var nomProvince = args.join(" ");

        const userid = message.author.id;
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        if (utilites.faitPartieDuRp(userid)){
            if (await utilites.messageConfirmation(message, "- creation de la province " + nomProvince)){
                var global = JSON.parse(fs.readFileSync("data/global.json"));
                const idProvince = Object.keys(global.provinces).length + 1;
                global.provinces[idProvince] = { "nom": nomProvince, "proprietaire": userid, "villes": [] };
                joueurs[userid].provinces = joueurs[userid].provinces.concat([idProvince]);
                var retour1 = JSON.stringify(joueurs, null, 2);
                fs.writeFileSync('data/joueurs.json', retour1);
                var retour2 = JSON.stringify(global, null, 2);
                fs.writeFileSync('data/global.json', retour2);
            }
        } else {
            message.reply("erreur : vous ne faites pas partie du rp")
        }
    },
};