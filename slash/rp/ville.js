const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ville')
		.setDescription('gestion de la ville')
        .addSubcommand(
            subcommand=>subcommand.setName("creer")
            .setDescription("création d'une nouvelle ville")
            .addStringOption(option => option.setName('nom').setDescription('le nom de la nouvelle ville').setRequired(true))
            .addStringOption(option => option.setName('commentaire').setDescription('un commentaire a donner aux mj').setRequired(true))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("info")
            .setDescription("information sur une ville")
            .addUserOption(option => option.setName('joueur').setDescription('le nom du joueur duquel il faut inspecter les villes'))
            .addIntegerOption(option => option.setName('ville').setDescription('l\'id de la ville a afficher'))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("modifier")
            .setDescription("modifier une information sur une ville")
            .addIntegerOption(option => option.setName('ville').setDescription('l\'id de la ville a modifier').setRequired(true))
            .addStringOption(option => option.setName('nom').setDescription('le nouveau nom de la ville'))
        )
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};