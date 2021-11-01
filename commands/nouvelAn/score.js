//ctx.arc(x, y, r, 1.5 * Math.PI, (quotient*2 * Math.PI) + (1.5 * Math.PI));
var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
const { randomInt } = require("crypto");
module.exports = {
    name: 'demineur',
    description: 'crées un démineur',
    args: false, 				//mettre a true quand la commande nécésite des arguments
    usage: '[{dimension x}] [{dimension y}] [{nombres de mines}]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	    //autres manières d'appeler la commande
    permissions: "",
    /**
     * @param {Discord.Message} message 
     * @param {String} args 
     */
    execute(message, args) {
        
    },
};
