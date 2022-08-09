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
		if (interaction.user.id == '361257883247050762'){
            const id = interaction.options.getString('id');
            const proposition = await data.db_linguistique.getPropositionById(id);
            if (interaction.options.getSubcommand() === "validate") {
                if (proposition.type == 'add') {
                    await data.db_linguistique.validateAddition(id);
                    await data.db_linguistique.purgeProposition(id);
                    await interaction.reply(`La proposition ${id} a été validée et ajoutée.`);
                }
                else if (proposition.type == 'edit') {
                    await data.db_linguistique.purgeProposition(id);
                    await interaction.reply(`la proposition ${id} a été validée et ajoutée`);
                }
            }
            else if (interaction.options.getSubcommand() === "reject"){
                await data.db_linguistique.rejectProposition(id);
                await interaction.reply(`La proposition ${id} a été rejetée.`);
            }

        }
        else await interaction.reply('seul awing peut faire cette commande');
	},
};
