const fs = require('fs');
const Discord = require('discord.js');
require("dotenv").config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


const prefix = 'a!';

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('a!help les bgs');
});

//spéciale dédi au bans qui ont des potes dans la moderation <3
client.on("guildBanRemove", function(guild, user){
	console.log(user.id);
	if(["334321322232381440","332153457005953025"].includes(user.id)){
		console.log("ça a tenté d'unban quelqu'un qui ne doit pas l'etre, olalala");
		guild.members.ban(user);
    }
});

// this code is executed every time they add a reaction
client.on('messageReactionAdd', (reaction, user) => {
	let limit = 5;
	if (reaction.emoji.name == '♻️' && reaction.count >= limit && reaction.message.channel.id === '476826071489052695') reaction.message.delete();
});

client.on('message', message => {

	if(message.author.bot || message.channel.type === "dm"){
		return;
	}
	
	let command;
	
	if (!message.content.startsWith(prefix) ) {
		if (message.channel.id == "522437669582667787") {
			command = client.commands.get("sondage");
		} else {
			return;
		}
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	if (command === undefined) {
		command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	}
	//implementation commande sondage random

	if(commandName === "kill"){
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has("ADMINISTRATOR")) {
			return message.reply('Vous ne pouvez pas faire cela !');
		} else {
			message.reply( '<@' + message.author.id + '> a detruit le bot !');
			client.destroy();
			return;
		}
	}

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Je ne peut pas exectuer cette commande en message privé');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('Vous ne pouvez pas faire cela !');
		}
	}

	if (command.args && !args.length) {
		let reply = `Tu n'a fourni aucun argument, ${message.author}!`;

		if (command.usage) {
			reply += `\nIl faudrait suivre la syntaxe suivante: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('erreur lors de l\'exectution de la commande');
	}

});

client.login(process.env.BOT_TOKEN);
