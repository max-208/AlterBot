const fs = require('fs');
//const { REST } = require('@discordjs/rest');
//const { Routes } = require('discord-api-types/v9');
const Discord = require('discord.js');
const { REST, Routes, PermissionsBitField, Events } = require('discord.js');
const utilities = require('./utilities');
require("dotenv").config();

const CHANNEL_SONDAGE = "1038906584673304683" //"522437669582667787";

const { Client, GatewayIntentBits } = require('discord.js');
const myIntents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildModeration,
	GatewayIntentBits.GuildEmojisAndStickers,
	GatewayIntentBits.GuildIntegrations,
	GatewayIntentBits.GuildWebhooks,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMessageTyping,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
]

const client = new Client({intents: myIntents, allowedMentions: { parse: ['users', 'roles'], repliedUser: true} });

//commandes slash
client.commands = new Discord.Collection();
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const slashCommandFolders = fs.readdirSync('./slash');
let slashCommands = [];
for (const folder of slashCommandFolders) {
	const slashCommandFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of slashCommandFiles) {
		const slashCommand = require(`./slash/${folder}/${file}`);
        if ('data' in slashCommand && 'execute' in slashCommand) {
		    client.commands.set(slashCommand.data.name, slashCommand)
            slashCommands.push(slashCommand.data.toJSON());
        } else {
            console.warn(`Slash command ${file} is missing data or execute function`);
        }

	}
}

const rest = new REST().setToken(process.env.BOT_TOKEN);
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
	client.user.setActivity('Me voila tout neuf');
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
client.on(Events.MessageReactionAdd, async (reaction, user) => {
	var member = user.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id);
	if (reaction.emoji.name == '🚩' && reaction.count >= 1 &&  member.roles.cache.some(role => role.id == utilities.roleMod ) ) {
		utilities.warn(reaction.message,member);
	}
	if (reaction.emoji.name == '♻️' && reaction.count >= 3 && reaction.message.channel == utilities.salonMeme && !reaction.message.author.bot && reaction.message.author.id != "352459053928022017") {
		reaction.message.channel.send("le repost hammer est tombé sur " + reaction.message.author.username + " *bonk*")
		await utilities.warn(reaction.message,null);
		await reaction.message.delete();
	}
});

// listener pour sondage
client.on('messageCreate', message => {
	if (message.channel.id == CHANNEL_SONDAGE) {
		let command = client.commands.get("sondage");
        command.newSondage(message);
	} else {
		return;
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
    if (interaction.commandName === "kill" && interaction.user.has(PermissionsBitField.Flags.Administrator)){
        interaction.reply( '<@' + interaction.user.id + '> a detruit le bot !');
        client.destroy();
        return;
    }
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(process.env.BOT_TOKEN);
