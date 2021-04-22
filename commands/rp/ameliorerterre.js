var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'ameliorerterre',
    description: 'ameliore le territoire du joueur en dépensant un PM',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{nombre de cases (1-)}> [{commentaire mj}...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        let prix = 1;

        let quantite = parseInt(args[0], 10);
        let commentaire = args.splice(1).join(" ");
        if (quantite > 0) {
            if (utilites.faitPartieDuRp(message.author.id)) {
                var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                let dataUser = joueurs[message.author.id];
                if (dataUser["PM"] >= (quantite * prix)) {
                    //verif joueur
                    if (await utilites.messageConfirmation(message, "- achat de " + quantite + " cases " + "\n- depense de :zap: " + (quantite * prix) + "\n- commentaire mj: *" + commentaire + "*")) {
                        dataUser["PM"] = parseInt(dataUser["PM"], 10) - quantite * prix;
                        let retour = JSON.stringify(joueurs, null, 2);
                        fs.writeFileSync('data/joueurs.json', retour);
                        //verif mj
                        if(await utilites.messageMJ(message, "- achat de " + quantite + " cases pour <@" + message.author.id + "> (" + dataUser["pays"] + ")\n- commentaire : *" + commentaire + "*")){
                            dataUser["nbCases"] = parseInt(dataUser["nbCases"], 10) + quantite;
                        } else {
                            dataUser["PM"] = parseInt(dataUser["PM"], 10) + quantite * prix;
                        }

                        retour = await JSON.stringify(joueurs, null, 2);
                        await fs.writeFileSync('data/joueurs.json', retour);
                    }
                } else {
                    message.reply("vous n'avez pas assez de PM pour cela, il vous manque :zap: **" + (quantite * prix - parseInt(dataUser["PM"], 10)) + "** !")
                }
            } else {
                message.reply("vous ne faites pas partie du rp :0");
            }
        } else {
            message.reply("quantité non correcte : la quantité doit etre positive");
        }

    },
};