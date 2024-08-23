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
        //console.log(allMatches)
        // Remove duplicates
        const uniqueMatches = allMatches.filter((item, index, self) =>
            index === self.findIndex((t) => t.match === item.match)
        );
        if (uniqueMatches !== null) {
            let count = 0;
            for (const { match: emojiMessage } of uniqueMatches) {
                count ++;
                if (count >= 20){
                    message = await message.channel.send("Suite :")
                    count = 0;
                }
                let reactionEmoji;
                if (emojiMessage.match(/:/g)) {
                    reactionEmoji = (emojiMessage.match(/[^:<>]+/g));
                    if ((message.client.emojis.cache.find(emoji => emoji.id === reactionEmoji[1]) !== undefined) || (client.emojis.cache.find(emoji => emoji.id === reactionEmoji[2]) !== undefined)) {
                        if (emojiMessage.match(/<a/g)) {
                            reactionEmoji = reactionEmoji[2];
                        } else {
                            reactionEmoji = reactionEmoji[1];
                        }
                        await message.react(reactionEmoji);
                    } else {
                        if(emojiMessage.match(/<a/g)){
                            console.log("creation emoji animé");
                            emote = await message.guild.emojis.create({attachment: "https://cdn.discordapp.com/emojis/"+ reactionEmoji[2]+".gif", name: reactionEmoji[1]})
                            await message.react(emote);
                            await emote.delete()
                        } else {
                            console.log("creation emoji");
                            emote = await message.guild.emojis.create({attachment: "https://cdn.discordapp.com/emojis/"+ reactionEmoji[1]+".png", name: reactionEmoji[0]})
                            await message.react(emote);
                            await emote.delete()
                        }
                    }
                } else {
                    await message.react(emojiMessage);
                }
            }
        }
}

