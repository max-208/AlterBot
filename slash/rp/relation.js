const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('relation')
		.setDescription('modifies tes informations')
        .addStringOption(option => option.setName('modification').setDescription('la modification a faire').setRequired(true).addChoices([["ajout","ajout"],["retrait","retrait"]]))
        .addStringOption(option => option.setName('type').setDescription('le type de relation').setRequired(true).addChoices([["allie","allie"],["ennemi","ennemi"]]))
        .addUserOption(option => option.setName('joueur').setDescription('le joueur a ajouter').setRequired(true))
        //.addUserOption(option => option.setName('joueur2').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur3').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur4').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur5').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur6').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur7').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur8').setDescription('un joueur supplémentaire a ajouter'))
        //.addUserOption(option => option.setName('joueur9').setDescription('un joueur supplémentaire a ajouter'))
    ,
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!");
	},
};