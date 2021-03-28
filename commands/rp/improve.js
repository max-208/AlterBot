var fs = require("fs");
module.exports = {
    name: 'improve',
    description: 'ameliore une des statistiques en dépensant un PM',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<stat> <quantité a ameliorer>',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    execute(message, args) {
        let prix = 1;
        let stat = args[0];
        console.log(stat)
        if (stat.match(/[Aa][Rr][Mm][EeÉé][Ee]?[Ss]?/)) {
            stat = "armee";
        } else if (stat.match(/[Mm][Aa][Rr][Ii][Nn][Ee][Ss]?/)) {
            stat = "marine";
        } else if (stat.match(/[Ss][Cc]?[Ii][Ee][Nn][Cc]?[Ss]?[Ee][Ss]?/)) {
            stat = "science";
        } else if (stat.match(/[Cc][Uu][Ll][Tt][Uu][Rr][Ee]?[Ss]?/)) {
            stat = "culture";
        } else if (stat.match(/[Rr][Ee][Ll][Ii][Gg][Ii][Oo][Nn][Ss]?/)) {
            stat = "religion";
        } else if (stat.match(/[Ee][Cc][Oo][Nn][Oo][Mm][Ii][Ee]?[Ss]?/)) {
            stat = "economie";
        } else if (stat.match(/[Nn]?[Bb]?[Cc][Aa][Ss][Ee][Ss]?/)) {
            stat = "nbCases";
        } else {
            stat = "erreur";
        }
        console.log(stat)

        let quantite = parseInt(args[1], 10);
        if (stat != "erreur") {
            if (quantite > 0) {
                var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                let dataUser = joueurs[message.author.id];
                if (dataUser != undefined) {
                    if (dataUser["PM"] >= (quantite * prix)) {
                        dataUser[stat] = parseInt(dataUser[stat], 10) + quantite;
                        dataUser["PM"] = parseInt(dataUser["PM"], 10) - quantite * prix;

                        let retour = JSON.stringify(joueurs, null, 2);
                        fs.writeFileSync('data/joueurs.json', retour);
                        message.react("✅");

                    } else {
                        message.reply("vous n'avez pas assez de PM pour cela, il vous manque :zap: **" + (quantite * prix - parseInt(dataUser["PM"], 10)) + "** !")
                    }
                } else {
                    message.reply("vous ne faites pas partie du rp :0");
                }
            } else {
                message.reply("quantité non correcte : la quantité doit etre positive");
            }
        } else {
            message.reply("Statistique incorrecte : choix acceptés \n `armee, marine, science, culture, religion, economie, nbcases` ")
        }
    },
};