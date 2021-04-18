var fs = require("fs");
module.exports = {
    name: 'province',
    description: 'commande permettant la gestion des provinces',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<create(1]|edit(2)|add(3)> <{nom de la province}(1)|{id de la province}(2,3)> <{nouveau nom}(2)...|{id de la ville}(3)> [{id d\'autre villes}(3)...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    execute(message, args) {
        if (args[0].match(/[Cc][Rr][Ee][Aa][Tt][Ee]/)) {
            
        } else if (args[0].match(/[Ee][Dd][Ii][Tt]/)) {
            
        } else if (args[0].match(/[Aa][Dd][Dd]/)) {
            
        } else {
            message.reply("premier argument incorrect : valeurs attendues \n `create, edit, add`");
        }

    },
};