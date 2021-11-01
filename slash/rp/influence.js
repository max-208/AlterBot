const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('influence')
		.setDescription('gestion de l\'influence')
        .addSubcommand(
            subcommand=>subcommand.setName("info")
            .setDescription("information sur l'influence d'une ou plusieurs villes")
            .addUserOption(option => option.setName('joueur').setDescription('le nom du joueur duquel il faut inspecter les villes'))
            .addIntegerOption(option => option.setName('ville').setDescription('l\'id de la ville a inspecter'))
        )
        .addSubcommand(
            subcommand=>subcommand.setName("influencer")
            .setDescription("ajouter de l'influence sur une ville")
            .addIntegerOption(option => option.setName('ville').setDescription('id de la ville impactee').setRequired(true))
            .addStringOption(option => option.setName('type').setDescription('type d\'influence utilise').setRequired(true).addChoices([["religion","religion"],["economie","economie"]]))
            .addIntegerOption(option => option.setName('quantite').setDescription('quantite d\'influence a attribuer a cette ville').setRequired(true))
        )
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};