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
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        if (args[0] == 0 || global.provinces[args[0]] != undefined) {
            if (args[0] == 0 || global.provinces[args[0]].proprietaire == message.author.id) {
                if (args[1] != undefined) {
                    for (var i in args.slice(1)) {
                        var idville = args.slice(1)[i];
                        console.log(i + " - " + idville);
                        if (global.villes[idville] != undefined) {
                            if (global.villes[idville].proprietaire == message.author.id) {
                                if (global.villes[idville].province != 0) {
                                    global.provinces[global.villes[idville].province].villes = global.provinces[global.villes[idville].province].villes.filter(item => item !== idville);
                                }
                                global.villes[idville].province = args[0];
                                if (args[0] != 0) {
                                    global.provinces[args[0]].villes = global.provinces[args[0]].villes.concat([idville])
                                }
                            } else {
                                message.reply("troisième argument incorrect : cette ville ne t'appartiens pas")
                            }
                        } else {
                            message.reply("troisième argument incorrect : cette ville n'existe pas")
                        }
                    }
                    var retour1 = JSON.stringify(global, null, 1);
                    fs.writeFileSync('data/global.json', retour1);
                    message.react("✅");
                } else {
                    message.reply("troisième argument incorrect : veuillez fournir au mois une ville");
                }
            } else {
                message.reply("deuxième argument incorrect : cette province ne t'appartiens pas");
            }
        } else {
            message.reply("deuxième argument incorrect : cette province n'existe pas");
        }
    },
};
