const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echange')
		.setDescription('echanges entre deux joueurs')
        .addUserOption(option => option.setName('joueur').setDescription('le joueur avec qui l\'echange aura lieu').setRequired(true))

        .addIntegerOption(option => option.setName('donne_point_mouvement').setDescription('ce que le joueur executant la commande donne en PM a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_armee').setDescription('ce que le joueur executant la commande donne en armee a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_marine').setDescription('ce que le joueur executant la commande donne en marine a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_science').setDescription('ce que le joueur executant la commande donne en science a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_culture').setDescription('ce que le joueur executant la commande donne en culture a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_religion').setDescription('ce que le joueur executant la commande  en religion a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_economie').setDescription('ce que le joueur executant la commande donne en economie a l\'autre joueur'))
        .addIntegerOption(option => option.setName('donne_territoire').setDescription('ce que le joueur executant la commande donne en territoire a l\'autre joueur'))
        .addBooleanOption(option => option.setName('donne_ville').setDescription('est ce que le joueur executant la commande donne une ou plusieur villes a l\'autre joueur'))

        .addIntegerOption(option => option.setName('recois_point_mouvement').setDescription('ce que le joueur executant la commande recois en PM de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_armee').setDescription('ce que le joueur executant la commande recois en armee de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_marine').setDescription('ce que le joueur executant la commande recois en marine de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_science').setDescription('ce que le joueur executant la commande recois en science de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_culture').setDescription('ce que le joueur executant la commande recois en culture de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_religion').setDescription('ce que le joueur executant la commande  en religion de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_economie').setDescription('ce que le joueur executant la commande recois en economie de l\'autre joueur'))
        .addIntegerOption(option => option.setName('recois_territoire').setDescription('ce que le joueur executant la commande recois en territoire de l\'autre joueur'))
        .addBooleanOption(option => option.setName('recois_ville').setDescription('est ce que le joueur executant la commande recois une ou plusieur villes de l\'autre joueur'))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};

