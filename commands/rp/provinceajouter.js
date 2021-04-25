var fs = require("fs");
const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
    name: 'provinceajouter',
    description: 'ajoutes une ville a la province ',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{id province}> <{id ville}> [{id ville}...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        console.log(new Date().toLocaleString() + " - province ajouter");
        var global = JSON.parse(fs.readFileSync("data/global.json"));
        if (args[0] == 0 || global.provinces[args[0]] != undefined) {
            if (args[0] == 0 || global.provinces[args[0]].proprietaire == message.author.id) {
                if (args[1] != undefined) {
                    var valide = true;
                    var messageTexte = "";
                    var validationListeVille = "";
                    for (var i in args.slice(1)) {
                        var idville = parseInt(args.slice(1)[i]);
                        if (global.villes[idville] != undefined) {
                            if (global.villes[idville].proprietaire == message.author.id) {
                                validationListeVille = validationListeVille + "(" + idville + ") " + global.villes[idville].nom + "\n";
                            } else {
                                messageTexte = messageTexte + idville + " : deuxième argument incorrect : cette ville ne t'appartiens pas\n";
                                valide = false;
                            }
                        } else {
                            messageTexte = messageTexte + idville + " : deuxième argument incorrect : cette ville n'existe pas\n";
                            valide = false;
                        }
                    }
                    if (!valide) {
                        message.reply(messageTexte);
                    } else {
                        let texteProvince;
                        if(args[0] == 0){
                            texteProvince = "comme : aucune province"
                        } else {
                            texteProvince = "comme : (" + args[0] + ") " + global.provinces[args[0]].nom;
                        }
                        if(await utilites.messageConfirmation(message,"- définir la province des villes\n" + validationListeVille + texteProvince)){
                            console.log(new Date().toLocaleString() + " - province ajouter confirmation");
                            global = JSON.parse(fs.readFileSync("data/global.json"));
                            //pour chaque ville
                            for (var i in args.slice(1)) {
                                var idville = parseInt(args.slice(1)[i]);
                                console.log(i + " - " + idville);
                                if(global.villes[idville].province != args[0]){
                                    if (global.villes[idville].province != 0) {
                                        //enlever la ville de la liste de ville de l'ancienne province
                                        global.provinces[global.villes[idville].province].villes = global.provinces[global.villes[idville].province].villes.filter(item => item != idville);
                                    }
                                    //ajouter la province en paramètre de la ville
                                    global.villes[idville].province = args[0];
                                    if (args[0] != 0) {
                                        //ajouter la ville dans la liste de ville de la province
                                        global.provinces[args[0]].villes = global.provinces[args[0]].villes.concat([idville])
                                    }
                                }
                            }
                            var retour1 = JSON.stringify(global, null, 1);
                            fs.writeFileSync('data/global.json', retour1);
                        }
                    }
                } else {
                    message.reply("deuxième argument incorrect : veuillez fournir au mois une ville");
                }
            } else {
                message.reply("premier argument incorrect : cette province ne t'appartiens pas");
            }
        } else {
            message.reply("premier argument incorrect : cette province n'existe pas");
        }
    },
};
