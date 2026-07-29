const { SlashCommandBuilder, ChannelType } = require('discord.js');
const utilities = require("../../utilities");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('archive')
    .setDescription('Archive des salons')
    .addSubcommand(subcommand =>
        subcommand
            .setName("salon")
            .setDescription("Archiver un salon")
            .addChannelOption(option =>
                option.setName("salon")
                    .setDescription("Le salon à archiver")
                    .setRequired(true)
            ).addChannelOption(option =>
                option.setName("catégorie")
                    .setDescription("La catégorie d'archive")
                    .setRequired(false)
                    .addChannelTypes(ChannelType.GuildCategory)
            )
    ).addSubcommand(subcommand =>
        subcommand.setName("catégorie")
            .setDescription("Archiver une catégorie")
            .addChannelOption(option =>
                option.setName("catégorie")
                    .setDescription("La catégorie à archiver")
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildCategory)
            )
        ),

    async execute(interaction) {
        try {
            const archivistRole = await utilities.readConfigProperty("roleArchivist");
            let toArchive;
            if (!archivistRole) {
                return await interaction.reply({
                    content: "Le rôle d'archiviste (staff wiki) n'est pas configuré !\nConfigurez le avec `/configure set roleArchivist <role>`",
                    ephemeral: true
                });
            }
            if (interaction.options.getSubcommand() === "salon") {
                const archiveCategory = interaction.options.getChannel("catégorie") || await utilities.readConfigProperty("categoryArchive");
                if (!archiveCategory) {
                    return await interaction.reply({
                        content: "La catégorie d'archive par défaut n'est pas configurée !\nConfigurez-la avec `/configure set categoryArchive <catégorie>`",
                        ephemeral: true
                    });
                }
                const channel = interaction.options.getChannel("salon");
                toArchive = channel;
                await channel.edit({parent: archiveCategory});
                await channel.lockPermissions();
            } else if (interaction.options.getSubcommand() === "catégorie") {
                const category = interaction.options.getChannel("catégorie");
                toArchive = category;
                await category.permissionOverwrites.set([{
                    id: interaction.guild.roles.everyone.id,
                    allow: [],
                    deny: ['ViewChannel']
                }, {
                    id: archivistRole,
                    allow: ['ViewChannel'],
                    deny: ['SendMessages']
                }, {
                    id: await utilities.readConfigProperty("roleMod"),
                    allow: ['ViewChannel'],
                    deny: []
                }])
                category.children.cache.map(async channel => await channel.lockPermissions());
            }
            await interaction.reply({content: `${toArchive} a été archivé !`, ephemeral: true});
        } catch (error) {
            console.error(error);
        }
    }
}