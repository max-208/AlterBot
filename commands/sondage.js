//TODO: ameliorer la prise en compte des emojis drapeau transgenre, ecosse, pays de galles, angleterre
//TODO: trouver une solution au probleme de conflit causé par :regional_indicator_i: :regional_indicator_q: :flag_iq: 
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
        //console.log(regexMatch);
        //prise en compte des drapeaux de pays / teintes de peau
        let i = 0
        while (i < regexMatch.length - 1) {
            if ((regexMatch[i].match(/[\uD83C][\uDDE6-\uDDFF]/) && regexMatch[i + 1].match(/[\uD83C][\uDDE6-\uDDFF]/)) || (regexMatch[i + 1].match(/🏻|🏼|🏽|🏾|🏿/))) {
                if (message.content.match(regexMatch[i] + regexMatch[i + 1])) {
                    regexMatch[i] = regexMatch[i] + regexMatch[i + 1]
                    regexMatch.splice(i + 1, 1);
                }
            }
            i++;
        }
        //console.log(regexMatch);
        //prise en compte des drapeaux gay/trangenre/pirate
        i = 0;
        while (i < regexMatch.length - 2) {
            if (regexMatch[i].match(/🏳|🏴/) && regexMatch[i + 1].match(/\u200D/)) {
                if (regexMatch[i + 2].match("🌈")) {
                    regexMatch[i + 2] = "🏳️‍🌈";
                } else if (regexMatch[i + 2].match("☠")) {
                    regexMatch[i + 2] = "🏴‍☠️";
                }
                regexMatch.splice(i, 2);
            }
            i++;
        }
        //console.log(regexMatch);
        //boucle qui detecte quel type d'emoji est en jeu et reagi de manière accordée
        i = 0;
        if (regexMatch !== null) {
            while (i < regexMatch.length) {
                //console.log(regexMatch[i]);
                const emojiMessage = regexMatch[i];
                let reactionEmoji;
                if (emojiMessage.match(/\:/g)) {
                    reactionEmoji = (emojiMessage.match(/[^:<>]+/g));
                    if ((message.client.emojis.cache.find(emoji => emoji.name === reactionEmoji[0]) !== undefined) || (client.emojis.cache.find(emoji => emoji.name === reactionEmoji[1]) !== undefined)) {
                        if (emojiMessage.match(/<a/g)) {
                            reactionEmoji = reactionEmoji[2];
                            //type2 : emoji discord animé
                        } else {
                            reactionEmoji = reactionEmoji[1];
                            //type1 : emoji discord standard
                        }
                    } else {
                        i++;
                        continue;
                    }
                } else {
                    reactionEmoji = emojiMessage;
                    //type3 ! emoji unicode
                }
                message.react(reactionEmoji);
                //console.log(reactionEmoji);
                i++;
            }
        }
    },
};