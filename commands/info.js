var fs = require("fs");
const Discord = require('discord.js');
const { emitKeypressEvents } = require("readline");
module.exports = {
    name: 'info',
    description: 'redirige un utilisateur vers un autre salon',
    args: false, 				//mettre a true quand la commande nécésite des arguments
    usage: '',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	    //autres manières d'appeler la commande
    //permissions: "",
    execute(message, args) {
        console.log("ok");
        var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
        var embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Statistiques de ' + message.author.username)
        let userId = message.author.id;
        let dataUser = joueurs[userId]
        if(dataUser != undefined){

            if(dataUser.drapeau != ""){
                embed.setThumbnail(dataUser.drapeau);
            } else {
                embed.setThumbnail(message.author.avatar);
            }

            if(dataUser.suzerain != ""){
                embed.addField("Suzerain", "<@" + dataUser.suzerain + ">", false);
            }

            embed.addField("Nom du pays", dataUser.pays, false);
            embed.addField("Devise", "*" + dataUser.pays + "*", false);
            embed.addField("Points de mouvement", "**PM** " + dataUser.PM, false);

            embed.addField("Armee", ":dart: " + dataUser.armee, true);
            embed.addField("Marine", ":anchor: " + dataUser.marine, true);
            embed.addField("Economie", ":moneybag: " + dataUser.economie, true);
            
            embed.addField("Religion", ":pray: " + dataUser.religion, true);
            embed.addField("Culture", ":books: " + dataUser.culture, true);
            embed.addField("Science", ":microscope: " + dataUser.science, true);

            embed.addField("nb cases", ":mount_fuji: " + dataUser.nbCases, true);
            embed.addField("nb villes", ":city_sunset: " + dataUser.villes.length, true);
            embed.addField("nb provinces", ":large_blue_diamond: " + dataUser.provinces.length, true);

            var allies = "";
            for(var i = 0; i < dataUser.allies.length; i++) {
                allies = allies + "<@" + dataUser.allies[i] + ">\n";
            }
            if(dataUser.allies == []){
                allies = "aucun allié";
            }
            embed.addField("Allies", allies, true);

            var ennemis = "";
            for(i = 0; i < dataUser.ennemis.length; i++) {
                ennemis = ennemis + "<@" + dataUser.ennemis[i] + ">\n";
            }
            if(dataUser.ennemis == []){
                ennemis = "aucun ennemis";
            }
            embed.addField("Ennemis", ennemis, true);

            var vassaux = "";
            for(i = 0; i < dataUser.vassaux.length; i++) {
                vassaux = vassaux + "<@" + dataUser.vassaux[i] + ">\n";
            }
            if(dataUser.vassaux == []){
                vassaux = "aucun vassaux";
            }
            embed.addField("Vassaux", vassaux, true);

            message.channel.send(embed);
        } else {
            message.channel.send("je n'ai aucune information sur toi :0");
        }
        
        
        //jsonContent.max.info = "ewe";
        //let retour = JSON.stringify(jsonContent, null, 2);
        //fs.writeFileSync('data/joueurs.json', retour);

    },
};
