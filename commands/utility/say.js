module.exports = {
	name: 'say',
	description: 'dit ce que vous dites',
	args: true, 				//mettre a true quand la commande nécésite des arguments
	usage: '[{salon}] [{message}]',	//décrit les arguments nécéssaires a la commande
	guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
	cooldown: 5,				//cooldown en nombres de secondes
	aliases: [],	            //autres manières d'appeler la commande
    permissions : "MANAGE_MESSAGES",
	execute(message, args) {
        if(message.mentions.channels.first() != undefined){
            args.shift();
            message.mentions.channels.first().send(args.join(' '));
        } else {
		    message.channel.send(args.join(' '));
			message.delete();
        }
	},
};