const { SlashCommandBuilder } = require('discord.js');
const EMOJI_REGEX = require('emojibase-regex');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sondage')
    .setDescription('Entrez cette commande, puis faites le sondage, le bot ajoutera ensuite les réactions'),
    async execute(interaction) {
        const filter = m => m.author.id === interaction.user.id;
        interaction.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {createSondage(collected.first())})
            .catch(collected => {console.log("Erreur lors de la création du sondage")});
        await interaction.reply({ content: "Envoyez votre sondage !", ephemeral: true });
    },
    async newSondage(message) {
        createSondage(message);
    }
};

/**
    * @param {Discord.Message} message 
    * @param {String} args 
    */
    async function createSondage(message) {
        const client = message.client;
        const discordEmoji = new RegExp(/(<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/ug);
        const unicodeEmoji = new RegExp(EMOJI_REGEX, 'g');
        //console.log(message.content);

        const discordMatch = message.content.match(discordEmoji);
        const unicodeMatch = message.content.match(unicodeEmoji);

        let discordMatches = [];
        let unicodeMatches = [];
        let match;
        while ((match = discordEmoji.exec(message.content)) !== null) {
            discordMatches.push({ match: match[0], index: match.index });
        }
        while ((match = unicodeEmoji.exec(message.content)) !== null) {
            unicodeMatches.push({ match: match[0], index: match.index });
        }

        const allMatches = [...discordMatches, ...unicodeMatches];
        allMatches.sort((a, b) => a.index - b.index);
        //console.log(discordMatch);
        //console.log(unicodeMatch);
        let emoteList = [];
        let reactList = [];
        //console.log(allMatches[0])
        if (allMatches !== null) {
            for (const { match: emojiMessage } of allMatches) {
                let reactionEmoji;
                if (emojiMessage.match(/:/g)) {
                    reactionEmoji = (emojiMessage.match(/[^:<>]+/g));
                    if ((message.client.emojis.cache.find(emoji => emoji.id === reactionEmoji[1]) !== undefined) || (client.emojis.cache.find(emoji => emoji.id === reactionEmoji[2]) !== undefined)) {
                        if (emojiMessage.match(/<a/g)) {
                            reactionEmoji = reactionEmoji[2];
                        } else {
                            reactionEmoji = reactionEmoji[1];
                        }
                    } else {
                        if(emojiMessage.match(/<a/g)){
                            console.log("creation emoji animé");
                            emote = await message.guild.emojis.create({attachment: "https://cdn.discordapp.com/emojis/"+ reactionEmoji[2]+".gif", name: reactionEmoji[1]})
                            emoteList.push(emote);
                            await message.react(emote);
                        } else {
                            console.log("creation emoji");
                            emote = await message.guild.emojis.create({attachment: "https://cdn.discordapp.com/emojis/"+ reactionEmoji[1]+".png", name: reactionEmoji[0]})
                            emoteList.push(emote);
                            await message.react(emote);
                        }
                        continue;
                    }
                } else {
                    reactionEmoji = emojiMessage;
                }
                //console.log(reactionEmoji);
                reactList.push(reactionEmoji);
            }
        }
        //console.log(reactList);
        let count = 0;
        for (let react of reactList) {
            if (count >= 20){
                message = await message.channel.send("Suite :")
                count = 0;
            }
            await message.react(react);
            count++;
        }
        for (let emote of emoteList) {
            await emote.delete();
            console.log("suppression emoji");
        }
}

