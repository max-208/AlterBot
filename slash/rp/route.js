const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('route')
		.setDescription('relies deux villes par une route')
        .addIntegerOption(option => option.setName('origine').setDescription('ville d\'origine de la route').setRequired(true))
        .addIntegerOption(option => option.setName('destination').setDescription('ville de destination de la route').setRequired(true))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};
