var fs = require("fs");
const Discord = require('discord.js');
module.exports = {
    name: 'join',
    description: 'rejoins le rp',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<nom du pays>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {

        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        if (joueurs[message.author.id] == undefined) {
            let msgConfirmation = await message.reply("confirmez que vos shouaitez rejoindre le rp avec votre pays \"" + args.join(" ") + "\" en reagissant :white_check_mark: sous ce message")
            await msgConfirmation.react("✅");

            const filter = (reaction, user) => {
                return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msgConfirmation.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                    joueurs[message.author.id] = { "pays": args.join(" ") , "drapeau": "", "regime" : "", "devise": "", "PM": 0, "armee": 0, "marine": 0, "science": 0, "culture": 0, "religion": 0, "economie": 0, "nbCases": 0, "provinces": [], "villes": [], "cultures": [0], "technologies": [0], "allies": [], "ennemis": [], "suzerain": "", "vassaux": [], "organisations": [] };
                    let retour = JSON.stringify(joueurs, null, 2);
                    fs.writeFileSync('data/joueurs.json', retour);
                })
        } else {
            message.reply("vous faites deja partie du rp :0");
        }
    },
};