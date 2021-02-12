module.exports = {
    name: 'redirection',
    description: 'redirige un utilisateur vers un autre salon',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<salon> <utilisateur1> [utilisateurs2...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: ["rd"],	    //autres manières d'appeler la commande
    permissions: "MANAGE_MESSAGES",
    execute(message, args) {
        if (message.mentions.users && message.mentions.channels) {
            const users = message.mentions.users.array();
            const channel = message.mentions.channels.first();
            message.channel.send(users.join(", ") + " merci de bien vouloir vous diriger dans <#" + channel + "> comme l\'a demandé <@" + message.author + ">. votre acces a <#" + message.channel + "> sera donc restreint pour les 3 prochaines minutes");
            console.log("a");
            for (usr in users) {
                message.channel.updateOverwrite(users[usr], { SEND_MESSAGES: false });
            }
            setTimeout(() => {
                console.log("b");
                for (usr in users) {
                    message.channel.updateOverwrite(users[usr], { SEND_MESSAGES: null });
                    message.channel.permissionOverwrites.get(users[usr].id).delete();
                }
            }, 180000);
        }
    },
};
