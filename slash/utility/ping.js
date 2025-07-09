const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	/**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};