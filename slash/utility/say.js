const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('dit ce que vous dites')
        //.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option =>
            option.setName('message')
                .setDescription('le message à dire')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('le salon dans lequel dire')
                .setRequired(false)),
    async execute(interaction) {
        let start = Date.now();
        let channel = interaction.options.getChannel('salon');
        if (!channel) {
            channel = interaction.channel;
        }
        let text = interaction.options.getString('message');
        interaction.reply({content: "le message est en cours de traitement", ephemeral: true}); 
        const regex = new RegExp(/(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g);
		var regexMatch = text.match(regex);
		var emoteList = [];
		i = 0;
		count = 0;
		while (regexMatch != null && i < regexMatch.length && count < 20 ) {
			regexMatch = text.match(regex);
			var reactionEmoji = (regexMatch[i].match(/[^:<>]+/g));
			if (!(interaction.client.emojis.cache.find(emoji => emoji.id === reactionEmoji[1]) !== undefined) || (client.emojis.cache.find(emoji => emoji.id === reactionEmoji[2]) !== undefined)) {
				if(regexMatch[i].match(/<a/g)){
					console.log("creation emoji animé");
					var emote = await interaction.guild.emojis.create({attachment: "https://cdn.discordapp.com/emojis/"+ reactionEmoji[2]+".gif", name: reactionEmoji[1]});
					emoteList.push(emote).then;
					var reg = new RegExp(reactionEmoji[2],'g')
					text = text.replace(reg,emote.id);
					console.log(reactionEmoji[2] + " -> " + emote.id);
					count++;
				} else {
					console.log("creation emoji");
					var emote = await interaction.guild.emojis.create({attachment: "https://cdn.discordapp.com/emojis/"+ reactionEmoji[1]+".png", name: reactionEmoji[0]});
					emoteList.push(emote);
					var reg = new RegExp(reactionEmoji[1],'g')
					text = text.replace(reg,emote.id);
					console.log(reactionEmoji[1] + " -> " + emote.id);
					count++;
				}
			}
			i++;
        }
        await channel.send(text);
		for (let i = 0; i < emoteList.length; i++) {
			emoteList[i].delete();
			console.log("suppression emoji");
		}

		var end = Date.now();
		console.log(`Execution time: ${end - start} ms`);
    },
};
/*module.exports = {
	name: 'say',
	description: 'dit ce que vous dites',
	args: true, 				//mettre a true quand la commande nécésite des arguments
	usage: '[{salon}] [{interaction}]',	//décrit les arguments nécéssaires a la commande
	guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
	cooldown: 5,				//cooldown en nombres de secondes
	aliases: [],	            //autres manières d'appeler la commande
    permissions : "MANAGE_MESSAGES",
    /**
     * @param {Discord.Message} interaction 
     * @param {String} args 
     *
	async execute(interaction, args) {
		var start = Date.now();
		const client = interaction.client;
		channel = interaction.channel;
        if(interaction.mentions.channels.first() != undefined){
            args.shift();
			channel = interaction.mentions.channels.first();
		}
		var text = args.join(' ');
		console.log(text);
		interaction.delete();


        const regex = new RegExp(/(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g);
		var regexMatch = text.match(regex);
		var emoteList = [];
		i = 0;
		count = 0;
		while (regexMatch != null && i < regexMatch.length && count < 20 ) {
			regexMatch = text.match(regex);
			var reactionEmoji = (regexMatch[i].match(/[^:<>]+/g));
			if (!(interaction.client.emojis.cache.find(emoji => emoji.id === reactionEmoji[1]) !== undefined) || (client.emojis.cache.find(emoji => emoji.id === reactionEmoji[2]) !== undefined)) {
				if(regexMatch[i].match(/<a/g)){
					console.log("creation emoji animé");
					var emote = await interaction.guild.emojis.create("https://cdn.discordapp.com/emojis/"+ reactionEmoji[2]+".gif", reactionEmoji[1]);
					emoteList.push(emote).then;
					var reg = new RegExp(reactionEmoji[2],'g')
					text = text.replace(reg,emote.id);
					console.log(reactionEmoji[2] + " -> " + emote.id);
					count++;
				} else {
					console.log("creation emoji");
					var emote = await interaction.guild.emojis.create("https://cdn.discordapp.com/emojis/"+ reactionEmoji[1]+".png", reactionEmoji[0]);
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
};*/
