var fs = require("fs");
module.exports = {
    name: 'province',
    description: 'commande permettant la gestion des provinces',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<create(1]|edit(2)|add(3)> <{nom de la province}(1)|{id de la province}(2,3)> <{nouveau nom}(2)...|{id de la ville}(3)> [{id d\'autre villes}(3)...]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    execute(message, args) {
        if (args[0].match(/[Cc][Rr][Ee][Aa][Tt][Ee]/)) {
            if (args[1] != undefined) {
                const userid = message.author.id;
                var joueurs = JSON.parse(fs.readFileSync("data/joueurs.json"));
                if (joueurs[userid] != undefined) {
                    var global = JSON.parse(fs.readFileSync("data/global.json"));
                    const idProvince = Object.keys(global.provinces).length + 1;
                    global.provinces[idProvince] = { "nom": args.slice(1).join(" "), "proprietaire": userid, "villes": [] };
                    joueurs[userid].provinces = joueurs[userid].provinces.concat([idProvince]);
                    var retour1 = JSON.stringify(joueurs, null, 2);
                    fs.writeFileSync('data/joueurs.json', retour1);
                    var retour2 = JSON.stringify(global, null, 2);
                    fs.writeFileSync('data/global.json', retour2);
                    message.react("✅");
                } else {
                    message.reply("erreur : vous ne faites pas partie du rp")
                }
            } else {
                message.reply("deuxième argument incorrect : donnez un nom pour la province");
            }
        } else if (args[0].match(/[Ee][Dd][Ii][Tt]/)) {
            var global = JSON.parse(fs.readFileSync("data/global.json"));
            if (global.provinces[args[1]] != undefined) {
                if (global.provinces[args[1]].proprietaire == message.author.id) {
                    if (args[2] != undefined) {
                        global.provinces[args[1]].nom = args.slice(2).join(" ");
                        var retour2 = JSON.stringify(global, null, 2);
                        fs.writeFileSync('data/global.json', retour2);
                        message.react("✅");
                    } else {
                        message.reply("troixième argument incorrect : donnez un nom pour la province");
                    }
                } else {
                    message.reply("deuxième argument incorrect : cette province ne t'appartiens pas")
                }
            } else {
                message.reply("deuxième argument incorrect : cette province n'existe pas")
            }
        } else if (args[0].match(/[Aa][Dd][Dd]/)) {
            var global = JSON.parse(fs.readFileSync("data/global.json"));
            if (args[1] == 0 || global.provinces[args[1]] != undefined ) {
                if (args[1] == 0 ||  global.provinces[args[1]].proprietaire == message.author.id) {
                    if(args[2] != undefined){
                        for(var i in args.slice(2)){
                            var idville = args.slice(2)[i];
                            console.log(i + " - " + idville);
                            if (global.villes[idville] != undefined) {
                                if (global.villes[idville].proprietaire == message.author.id) {
                                    if(global.villes[idville].province != 0){
                                        global.provinces[global.villes[idville].province].villes = global.provinces[global.villes[idville].province].villes.filter(item => item !== idville);
                                    }
                                    global.villes[idville].province = args[1];
                                    if(args[1] != 0){
                                        global.provinces[args[1]].villes = global.provinces[args[1]].villes.concat([idville])
                                    }
                                } else {
                                    message.reply("troisième argument incorrect : cette ville ne t'appartiens pas")
                                }
                            } else {
                                message.reply("troisième argument incorrect : cette ville n'existe pas")
                            }
                        }
                        var retour2 = JSON.stringify(global, null, 2);
                        fs.writeFileSync('data/global.json', retour2);
                        message.react("✅");
                    } else {
                        message.reply("troisième argument incorrect : veuillez fournir au mois une ville");
                    }
                } else {
                    message.reply("deuxième argument incorrect : cette province ne t'appartiens pas");
                }
            } else {
                message.reply("deuxième argument incorrect : cette province n'existe pas");
            }
        } else {
            message.reply("premier argument incorrect : valeurs attendues \n `create, edit, add`");
        }

    },
};