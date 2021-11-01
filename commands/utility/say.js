const Discord = require('discord.js');
module.exports = {
	name: 'say',
	description: 'dit ce que vous dites',
	args: true, 				//mettre a true quand la commande nécésite des arguments
	usage: '[{salon}] [{message}]',	//décrit les arguments nécéssaires a la commande
	guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
	cooldown: 5,				//cooldown en nombres de secondes
	aliases: [],	            //autres manières d'appeler la commande
    permissions : "MANAGE_MESSAGES",
    /**
     * @param {Discord.Message} message 
     * @param {String} args 
     */
	async execute(message, args) {
		var start = Date.now();
		const client = message.client;
		channel = message.channel;
        if(message.mentions.channels.first() != undefined){
            args.shift();
			channel = message.mentions.channels.first();
		}
		var text = args.join(' ');
		console.log(text);
		message.delete();


        const regex = new RegExp(/(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g);
		var regexMatch = text.match(regex);
		var emoteList = [];
		i = 0;
		count = 0;
		while (regexMatch != null && i < regexMatch.length && count < 20 ) {
			regexMatch = text.match(regex);
			var reactionEmoji = (regexMatch[i].match(/[^:<>]+/g));
			if (!(message.client.emojis.cache.find(emoji => emoji.id === reactionEmoji[1]) !== undefined) || (client.emojis.cache.find(emoji => emoji.id === reactionEmoji[2]) !== undefined)) {
				if(regexMatch[i].match(/<a/g)){
					console.log("creation emoji animé");
					var emote = await message.guild.emojis.create("https://cdn.discordapp.com/emojis/"+ reactionEmoji[2]+".gif", reactionEmoji[1]);
					emoteList.push(emote).then;
					var reg = new RegExp(reactionEmoji[2],'g')
					text = text.replace(reg,emote.id);
					console.log(reactionEmoji[2] + " -> " + emote.id);
					count++;
				} else {
					console.log("creation emoji");
					var emote = await message.guild.emojis.create("https://cdn.discordapp.com/emojis/"+ reactionEmoji[1]+".png", reactionEmoji[0]);
					emoteList.push(emote);
					var reg = new RegExp(reactionEmoji[1],'g')
					text = text.replace(reg,emote.id);
					console.log(reactionEmoji[1] + " -> " + emote.id);
					count++;
				}
			}
			i++;
		}

		console.log(text);

		await channel.send(text);
		for (let i = 0; i < emoteList.length; i++) {
			emoteList[i].delete();
			console.log("suppression emoji");
		}

		var end = Date.now();
		console.log(`Execution time: ${end - start} ms`);
	},
};