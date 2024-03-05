const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
        const channel = interaction.options.getChannel('salon');
        const user = [];
        for (let i = 0; i < 5; i++) {
            const usr = interaction.options.getUser('utilisateur' + i);
            if (usr) {
                user.push(usr);
            }
        }
        let userMentions = "";
        user.forEach(usr => {
            userMentions = "<@" + usr.id + ">, " + userMentions;
            interaction.channel.permissionOverwrites.edit(usr, { SendMessages: false });
        });
        interaction.reply(userMentions + " merci de bien vouloir vous diriger dans <#" + channel + "> comme l\'a demandé <@" + interaction.user + ">. votre acces a <#" + interaction.channel + "> sera donc restreint pour les 3 prochaines minutes");
        setTimeout(() => {
            console.log("entering timeout");
            user.forEach(usr => {
                interaction.channel.permissionOverwrites.edit(usr, { SendMessages: null });
                interaction.channel.permissionOverwrites.delete(usr);
            });
        }, 30000);

    }
}

        

/*
module.exports = {
    name: 'redirection',
    description: 'redirige un utilisateur vers un autre salon',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{salon}> <{utilisateur1}> [{utilisateurs2}...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: ["rd"],	    //autres manières d'appeler la commande
    permissions: "MANAGE_MESSAGES",
    /**
     * @param {Discord.Message} message 
     * @param {String} args 
     *
    execute(message, args) {
        if (message.content.match(/<@!?(\d+)>/) && message.content.match(/#\w+/)) {
            const users = message.mentions.users;
            const channel = message.mentions.channels.first();
            var userMentions = "";
            users.forEach(usr => {
                userMentions =  "<@" + usr.id + ">, " + userMentions;
                message.channel.permissionOverwrites.edit(usr, { SEND_MESSAGES: false });
            });
            message.channel.send(userMentions + " merci de bien vouloir vous diriger dans <#" + channel + "> comme l\'a demandé <@" + message.author + ">. votre acces a <#" + message.channel + "> sera donc restreint pour les 3 prochaines minutes");
            setTimeout(() => {
                console.log("b");
                users.forEach(usr => {
                    message.channel.permissionOverwrites.edit(usr, { SEND_MESSAGES: null });
                    message.channel.permissionOverwrites.get(usr.id).delete();
                });
            }, 180000);
        } else {
            message.reply("suit la syntaxe suivante : a!redirection <salon> <utilisateur1> [utilisateurs2...]")
        }
    },
};*/
