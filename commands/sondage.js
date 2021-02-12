module.exports = {
    name: 'sondage',
    description: 'Reagis au emojis present dans le message',
    args: false, 				//mettre a true quand la commande nécésite des arguments
    usage: '[message]',	    //décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	            //autres manières d'appeler la commande
    execute(message, args) {
        const client = message.client;
        const regex = new RegExp(/(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g);
        const regexMatch = message.content.match(regex);
        let i = 0;
        if (regexMatch !== null) {
            while (i < regexMatch.length) {
                //console.log(regexMatch[i]);
                const emojiMessage = regexMatch[i];
                let reactionEmoji;
                if (emojiMessage.match(/\:/g)) {
                    reactionEmoji = (emojiMessage.match(/[^:<>]+/g));
                    //console.log("1: " + client.emojis.cache.find(emoji => emoji.name === reactionEmoji[0]));
                    //console.log("2: " + client.emojis.cache.find(emoji => emoji.name === reactionEmoji[1]));

                    if ((client.emojis.cache.find(emoji => emoji.name === reactionEmoji[0]) !== undefined) || (client.emojis.cache.find(emoji => emoji.name === reactionEmoji[1]) !== undefined)) {
                        if (emojiMessage.match(/<a/g)) {
                            reactionEmoji = reactionEmoji[2];
                            //console.log("type2");
                        } else {
                            reactionEmoji = reactionEmoji[1];
                            //console.log("type1");
                        }
                    } else {
                        i++;
                        continue;
                    }
                } else {
                    reactionEmoji = emojiMessage;
                    //console.log("type3");
                }
                message.react(reactionEmoji);
                //console.log(reactionEmoji);
                i++;
            }
        }
    },
};