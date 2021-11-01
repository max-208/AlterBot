const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('recherche')
		.setDescription('gestion de la recherche')
        .addSubcommand(
            subcommand=>subcommand.setName("info")
            .setDescription("information sur une ou plusieurs technologies")
            .addIntegerOption(option => option.setName('technologie').setDescription('l\'id de la technologie a inspecter'))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("rechercher")
            .setDescription("rechercher une technologie")
            .addIntegerOption(option => option.setName('technologie').setDescription('id de la technologie a rechercher').setRequired(true))
        )
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};