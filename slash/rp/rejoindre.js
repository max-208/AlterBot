const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rejoindre')
		.setDescription('rejoins le rp')
        .addStringOption(option => option.setName('nom').setDescription('le nom du pays').setRequired(true))
        .addStringOption(option => option.setName('regime').setDescription('le régime de gouvernance dy pays'))
        .addStringOption(option => option.setName('devise').setDescription('la devise nationale du pays'))
        .addStringOption(option => option.setName('drapeau').setDescription('un lien vers une image du drapeau du pays'))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};