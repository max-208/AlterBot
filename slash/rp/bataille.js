const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bataille')
		.setDescription('bataille entre deux joueurs')
        .addUserOption(option => option.setName('j1').setDescription('joueur 1 de la bataille').setRequired(true))
        .addUserOption(option => option.setName('j2').setDescription('joueur 2 de la bataille').setRequired(true))
        .addIntegerOption(option => option.setName('force_j1').setDescription('force de j1').setRequired(true))
        .addIntegerOption(option => option.setName('force_j2').setDescription('force de j2').setRequired(true))
        .addIntegerOption(option => option.setName('equilibre').setDescription('equilibre de depart de la bataille en pourcentage'))
        .addIntegerOption(option => option.setName('nb_tour_max').setDescription('nombre de tour max'))
        .addIntegerOption(option => option.setName('difficulte').setDescription('difficulte de la bataille (1-15)'))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};
