const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const utilities = require('../../utilities');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redirection')
        .setDescription('redirige un utilisateur vers un autre salon')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('le salon vers lequel rediriger')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('utilisateur1')
                .setDescription('l\'utilisateur à rediriger')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('utilisateur2')
                .setDescription("l'autre utilisateur à rediriger")
                .setRequired(false))
        .addUserOption(option =>
            option.setName('utilisateur3')
                .setDescription("l'autre utilisateur à rediriger")
                .setRequired(false))
        .addUserOption(option =>
            option.setName('utilisateur4')
                .setDescription("l'autre utilisateur à rediriger")
                .setRequired(false))
        .addUserOption(option =>
            option.setName('utilisateur5')
                .setDescription("l'autre utilisateur à rediriger")
                .setRequired(false)),
    async execute(interaction) {
        const TIMEOUT_TIME = await utilities.readConfigProperty("redirectionTimeout");
        const channel = interaction.options.getChannel('salon');
        const users = [];
        for (let i = 0; i < 5; i++) {
            const usr = interaction.options.getUser('utilisateur' + i);
            if (usr) {
                users.push(usr);
            }
        }
        let userMentions = "";
        interaction.reply(userMentions + " merci de bien vouloir vous diriger dans <#" + channel + "> comme l\'a demandé <@" + interaction.user + ">. votre acces a <#" + interaction.channel + "> sera donc restreint pour les " + TIMEOUT_TIME / 60000 + " prochaines minutes");
        if (interaction.channel.isThread()) {
            for (const user of users) {
                await utilities.registerUserForDeletionHook(user.id, interaction.channel.id, TIMEOUT_TIME);
            }
        } else {
            users.forEach(usr => {
                userMentions = "<@" + usr.id + ">, " + userMentions;
                interaction.channel.permissionOverwrites.edit(usr, {SendMessages: false});
            });
            setTimeout(() => {
                users.forEach(usr => {
                    interaction.channel.permissionOverwrites.edit(usr, {SendMessages: null});
                    interaction.channel.permissionOverwrites.delete(usr);
                });
            }, TIMEOUT_TIME);
        }
    }
}
