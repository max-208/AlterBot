const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modifier')
		.setDescription('modifies tes informations')
        .addStringOption(option => option.setName('nom').setDescription('le nouveau nom du pays'))
        .addStringOption(option => option.setName('regime').setDescription('le nouveau régime de gouvernance dy pays'))
        .addStringOption(option => option.setName('devise').setDescription('la nouvelle devise nationale du pays'))
        .addStringOption(option => option.setName('drapeau').setDescription('un lien vers une image du nouveau drapeau du pays'))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};