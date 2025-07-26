const fs = require('fs');

const Discord = require('discord.js');
const { REST, Routes, PermissionsBitField, Events, Client, GatewayIntentBits } = require('discord.js');
const utilities = require('./utilities');
require("dotenv").config();

utilities.initConfigIfEmpty();

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
		if(process.env.DEV_ENV === "TRUE"){
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

// this code is executed every time they add a reaction
client.on(Events.MessageReactionAdd, async (reaction, user) => {
	var member = user.client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id);
	config = await utilities.readConfig();
	if (reaction.emoji.name === '🚩' &&
		reaction.count >= config.warnNumberReaction &&
		member.roles.cache.some(role => role.id === config.roleMod ) ) {
		utilities.warn(reaction.message,member);
	}
	if (reaction.emoji.name === '♻️' &&
		reaction.count >= config.repostNumberReaction &&
		reaction.message.channel.id === config.channelMeme &&
		!reaction.message.author.bot) {

		reaction.message.channel.send("le repost hammer est tombé sur " + reaction.message.author.username + " *bonk*")
		await utilities.warn(reaction.message,null);
		await reaction.message.delete();
	}
});

// listener pour sondage
client.on('messageCreate', async message => {
	const config = await utilities.readConfig();
	await utilities.deletionHook(message)
	if (message.channel.id === config.channelSondage) {
		let command = client.commands.get("sondage");
        command.newSondage(message);
	}
});

client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
		}
	} else if (interaction.isAutocomplete()){
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
});


client.login(process.env.BOT_TOKEN);
