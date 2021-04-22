module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false, 				//mettre a true quand la commande nécésite des arguments
	//usage: '<arg1> <arg2>',	//décrit les arguments nécéssaires a la commande
	guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
	cooldown: 5,				//cooldown en nombres de secondes
	aliases: [],	//autres manières d'appeler la commande
	execute(message, args) {
		message.channel.send('Pong.');
	},
};