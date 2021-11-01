const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('modifie tes stats')
        .addIntegerOption(option => option.setName('armee').setDescription('quantité d\'armee a ameliorer').setRequired(true))
        .addIntegerOption(option => option.setName('marine').setDescription('quantité d\'marine a ameliorer').setRequired(true))
        .addIntegerOption(option => option.setName('science').setDescription('quantité de science a ameliorer').setRequired(true))
        .addIntegerOption(option => option.setName('culture').setDescription('quantité de culture a ameliorer').setRequired(true))
        .addIntegerOption(option => option.setName('religion').setDescription('quantité de religion a ameliorer').setRequired(true))
        .addIntegerOption(option => option.setName('economie').setDescription('quantité d\'economie a ameliorer').setRequired(true))
        .addIntegerOption(option => option.setName('territoire').setDescription('quantité de territoire a acheter').setRequired(true))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};
