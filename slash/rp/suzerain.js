const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suzerain')
		.setDescription('gestion de ses vassaux par un suzerain')
        .addStringOption(option => option.setName('action').setDescription('action a effectuer a son vassal').setRequired(true).addChoices([["vassaliser","vassaliser"],["liberer","liberer"],["incorporer","incorporer"]]))
        .addUserOption(option => option.setName('joueur').setDescription('le joueur vassal sur lequel effectuer l\'action').setRequired(true))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};