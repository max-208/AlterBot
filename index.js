const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Discord = require('discord.js');
const utilities = require('./utilities');
require("dotenv").config();

const { Client, Intents } = require('discord.js');
const myIntents = [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_WEBHOOKS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING
]

const client = new Client({intents: myIntents, allowedMentions: { parse: ['users', 'roles'], repliedUser: true} });

//commandes a!
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

//commandes slash
client.slashCommands = new Discord.Collection();
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
slashCommands = [];
const slashCommandFolders = fs.readdirSync('./slash');
for (const folder of slashCommandFolders) {
	const slashCommandFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashCommandFiles) {
		const slashCommand = require(`./slash/${folder}/${file}`);
		client.slashCommands.set(slashCommand.data.name, slashCommand)
		slashCommands.push(slashCommand.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		if(process.env.DEV_ENV == "TRUE"){
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: slashCommands },
			);
		} else {
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: slashCommands },
			);
		}

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

//gestion des events

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

//mise a jour utilisateur
client.on("guildMemberUpdate", function(oldMember, newMember){
	utilities.latiniser(newMember);
});
//arrivée utilisateur
client.on("guildMemberAdd", function(member){
	utilities.latiniser(member);
});

// this code is executed every time they add a reaction
client.on('messageReactionAdd', async (reaction, user) => {
	var member = user.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id);
	if (reaction.emoji.name == '🚩' && reaction.count >= 1 &&  member.roles.cache.some(role => role.id == utilities.roleMod ) ) {
		utilities.warn(reaction.message,member);
	}
	if (reaction.emoji.name == '♻️' && reaction.count >= 3 && reaction.message.channel == utilities.salonMeme && !reaction.message.author.bot && reaction.message.author.id != 352459053928022017) {
		reaction.message.channel.send("le repost hammer est tombé sur " + reaction.message.author.username + " *bonk*")
		await utilities.warn(reaction.message,null);
		await reaction.message.delete();
	}
	if(utilities.premierAvril == "TRUE"){
		if ( (reaction.emoji.name == '➕' || reaction.emoji.name == '➖' ) && reaction.message.author.id != user.id && reaction.message.channel != "522437669582667787" ) {
			utilities.premierAvrilAjoutReaction(reaction,user);
		}
	}
});

client.on('messageReactionRemove', (reaction, user) => {
	
	if(utilities.premierAvril == "TRUE"){
		if ( (reaction.emoji.name == '➕' || reaction.emoji.name == '➖' ) && reaction.message.author.id != user.id && reaction.message.channel != "522437669582667787" ) {
			utilities.premierAvrilRetirerReaction(reaction,user);
		}
	}
});


client.on('messageCreate', message => {

	if(message.author.bot || message.channel.type === "DM"){
		return;
	}

	let command;
	
	if (!message.content.toLowerCase().startsWith(prefix) ) {
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

	if (command.guildOnly && message.channel.type === 'DM') {
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

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(process.env.BOT_TOKEN);
