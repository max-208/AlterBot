const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('amelioration')
		.setDescription('amelioration des villes')
        .addSubcommand(
            subcommand=>subcommand.setName("info")
            .setDescription("information sur une ou plusieurs ameliorations")
            .addIntegerOption(option => option.setName('amelioration').setDescription('l\'id de l\'amelioration a inspecter'))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("ajouter")
            .setDescription("ajouter une amelioration a une ville")
            .addIntegerOption(option => option.setName('amelioration').setDescription('l\'id de l\'amelioration a ajouter').setRequired(true))
            .addIntegerOption(option => option.setName('ville').setDescription('id de la ville impactee').setRequired(true))
        )
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};