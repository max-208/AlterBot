const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('permet de récuperer des informations sur un joueur')
        .addUserOption(option => option.setName('joueur').setDescription('le joueur')
    ),
    /**
     * @param {Discord.CommandInteraction} interaction 
     */
	async execute(interaction) {
        return interaction.reply("pong!"); 
        //const row = new Discord.MessageActionRow()
		//	.addComponents(
		//		new Discord.MessageSelectMenu()
		//			.setCustomId('select')
		//			.setPlaceholder('Nothing selected')
		//			.setMinValues(1)
		//			.addOptions([
		//				{
		//					label: 'ville 1',
		//					description: 'This is a description',
		//					value: 'first_option',
		//				},
		//				{
		//					label: 'ville 2',
		//					description: 'This is also a description',
		//					value: 'second_option',
		//				},
		//			]),
		//	);	
		//	const row2 = new Discord.MessageActionRow()
		//	.addComponents(
		//		new Discord.MessageSelectMenu()
		//			.setCustomId('select2')
		//			.setPlaceholder('Nothing selected')
		//			.setMinValues(1)
		//			.addOptions([
		//				{
		//					label: 'ville 12',
		//					description: 'This is a description',
		//					value: 'first_option',
		//				},
		//				{
		//					label: 'ville 22',
		//					description: 'This is also a description',
		//					value: 'second_option',
		//				},
		//			]),
		//	);	
        //    interaction.client.on('interactionCreate', async interaction => {
        //        if (!interaction.isSelectMenu()) return;
        //    
        //        if (interaction.customId === 'select') {
        //            await interaction.update({ content: 'Something was selected!', components: [] });
        //        }
        //    });
		//return interaction.reply({ content: 'Pong!', components: [row,row2] });
	},
};