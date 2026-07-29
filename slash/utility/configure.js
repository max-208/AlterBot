const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const utilities = require("../../utilities")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configure')
        .setDescription('Configure the bot settings')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set a configuration value')
                .addStringOption(option =>
                    option.setName('setting')
                        .setDescription('The setting to configure')
                        .setRequired(true)
                        .setAutocomplete(true))
                .addStringOption(option =>
                    option.setName('value')
                        .setDescription('The value to set for the setting')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Get a configuration value')
                .addStringOption(option =>
                    option.setName('setting')
                        .setDescription('The setting to get')
                        .setRequired(true)
                        .setAutocomplete(true))
        ),

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        if (focusedOption.name === 'setting') {
            const settings = utilities.allowedConfigProperties;
            const filtered = settings.filter(setting => setting.startsWith(focusedOption.value));
            await interaction.respond(filtered.map(setting => ({ name: setting, value: setting })));
        } else if (focusedOption.name === 'value') {
            const setting = interaction.options.getString("setting");
            if (!utilities.allowedConfigProperties.includes(setting)) {
                await interaction.respond({name: "Invalid setting", value: "Invalid setting"});
                return;
            }
            if (setting.startsWith("channel")){
                const channels = interaction.guild.channels.cache.filter(channel => channel.name.startsWith(focusedOption.value));
                await interaction.respond(channels.map(channel => ({ name: channel.name, value: channel.id })));
            } else if (setting.startsWith("role")) {
                const roles = interaction.guild.roles.cache.filter(role => role.name.startsWith(focusedOption.value));
                await interaction.respond(roles.map(role => ({ name: role.name, value: role.id })));
            } else if (focusedOption.value !== '') {
                await interaction.respond([{ name: focusedOption.value, value: focusedOption.value }]);
            }
        }
    },
    async execute(interaction) {
        const setting = interaction.options.getString('setting');
        if (interaction.options.getSubcommand() === 'set') {
            const value = interaction.options.getString('value');
            if (!utilities.allowedConfigProperties.includes(setting)) {
                await interaction.reply({content: "Invalid setting", ephemeral: true});
                return;
            } else {
                await utilities.updateConfig(setting, value);
            }
            if (setting.startsWith("channel") || setting.startsWith("category")) {
                await interaction.reply(`Setting ${setting} has been set to <#${value}>.`);
            } else if (setting.startsWith("role")) {
                await interaction.reply(`Setting ${setting} has been set to <@&${value}>.`);
            } else {
                await interaction.reply(`Setting ${setting} has been set to ${value}.`);
            }
        } else if (interaction.options.getSubcommand() === 'get') {
            if (!utilities.allowedConfigProperties.includes(setting)) {
                await interaction.reply({content: "Invalid setting", ephemeral: true});
                return;
            }
            if (setting.startsWith("channel") || setting.startsWith("category")) {
                await interaction.reply(`Setting ${setting} has been set to <#${await utilities.readConfigProperty(setting)}>.`);
            } else if (setting.startsWith("role")) {
                await interaction.reply(`Setting ${setting} has been set to <@&${await utilities.readConfigProperty(setting)}>.`);
            } else {
                await interaction.reply(`Setting ${setting} has been set to ${setting}.`);
            }
        }
    }
}