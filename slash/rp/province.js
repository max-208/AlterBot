const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('province')
		.setDescription('gestion des provinces')
        .addSubcommand(
            subcommand=>subcommand.setName("creer")
            .setDescription("création d'une nouvelle province")
            .addStringOption(option => option.setName('nom').setDescription('le nom de la nouvelle province').setRequired(true))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("info")
            .setDescription("information sur une ou plusieurs province")
            .addUserOption(option => option.setName('joueur').setDescription('le nom du joueur duquel il faut inspecter les provinces'))
            .addIntegerOption(option => option.setName('province').setDescription('l\'id de la province a inspecter'))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("modifier")
            .setDescription("modifier une information sur une province")
            .addIntegerOption(option => option.setName('province').setDescription('l\'id de la province a modifier').setRequired(true))
            .addStringOption(option => option.setName('nom').setDescription('le nouveau nom de la province'))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("ajouter")
            .setDescription("ajouter une ville a la province")
            .addIntegerOption(option => option.setName('province').setDescription('l\'id de la province a modifier').setRequired(true))
            .addIntegerOption(option => option.setName('ville').setDescription('id de la ville a ajouter').setRequired(true))
        )
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};