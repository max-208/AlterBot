const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('decidesuggest')
		.setDescription('permet à awing de valider ou non les propositions, seul awing peut faire cette commande')
        .addSubcommand(subcommand =>
            subcommand
                .setName('validate')
                .setDescription('Valide la suggestion, awing, mon chéri, n\'oublie pas de le faire manuellement si il s\'agit d\'un edit')
                .addStringOption(option =>
                    option
                        .setName('id')
                        .setDescription("l'id de la suggestion")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reject')
                .setDescription('Rejette la suggestion')
                .addStringOption(option =>
                    option
                        .setName('id')
                        .setDescription("l'id de la suggestion")
                        .setRequired(true)
                )
        ),

	async execute(interaction) {
        //verify if the interaction come from awing
		if (interaction.user.id == data.awing_id){
            const id = interaction.options.getString('id');
            const proposition = await data.db_linguistique.getSuggest(id);
            if (interaction.options.getSubcommand() === "validate") {
                if (proposition.type == 'add') {
                    //for an add suggestion, copy it and delete the suggestion
                    await data.db_linguistique.validateAddition(id);
                    await data.db_linguistique.purgeProposition(id);
                    await interaction.reply(`La proposition ${id} a été validée et ajoutée.`);
                }
                else if (proposition.type == 'edit') {
                    //delete the suggestion, an edit must me done manually
                    await data.db_linguistique.purgeProposition(id);
                    await interaction.reply(`la proposition ${id} a été validée et ajoutée`);
                }
            }
            else if (interaction.options.getSubcommand() === "reject"){
                //delete the suggestion
                await data.db_linguistique.purgeProposition(id);
                await interaction.reply(`La proposition ${id} a été rejetée.`);
            }

        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
