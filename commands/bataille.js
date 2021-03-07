module.exports = {
    name: 'bataille',
    description: 'bataille entre deux joueurs',
    args: true, 				//mettre a true quand la commande nécésite des arguments
    usage: '<{mention j1}> <{mention j2}> <{force j1}> <{force j2}> [{equilibre% (10-90)}] [{difficulte (1-6)}]',	//décrit les arguments nécéssaires a la commande
    guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
    cooldown: 5,				//cooldown en nombres de secondes
    aliases: [],	//autres manières d'appeler la commande
    async execute(message, args) {
        console.log("bataille")
        var J1;
        var J2;
        var forceJ1;
        var forceJ2;
        var equilibre;
        var difficulte;
        var max;
        var min;
        var messagej1;
        var messagej2;
        var messagePublic;
        var complete = true;
        if (args[0] != undefined) {
            if (args[0].match(/<@!?(\d+)>/)) {
                J1 = message.mentions.users.array()[0];
            } else {
                complete = false;
                message.reply("premier argument incorrect");
            }
        } else {
            complete = false;
            message.reply("premier argument incorrect");
        }

        if (args[1] != undefined) {
            if (args[1].match(/<@!?(\d+)>/)) {
                J2 = message.mentions.users.array()[1];
            } else {
                complete = false;
                message.reply("deuxième argument incorrect");
            }
        } else {
            complete = false;
            message.reply("deuxième argument incorrect");
        }

        if (args[2] != undefined) {
            if (args[2].match(/[0-9]+/)) {
                forceJ1 = parseInt(args[2]);
            } else {
                complete = false;
                message.reply("troisième argument incorrect");
            }
        } else {
            complete = false;
            message.reply("troisième argument incorrect");
        }

        if (args[3] != undefined) {
            if (args[3].match(/[0-9]+/) && args[3] > 0) {
                forceJ2 = parseInt(args[3]);
            } else {
                complete = false;
                message.reply("quatrième argument incorrect");
            }
        } else {
            complete = false;
            message.reply("quatrième argument incorrect");
        }

        if (args[4] != undefined) {
            if (args[4].match(/[0-9]+/) && args[4] > 10 && args[4] < 90) {
                equilibre = parseInt(args[4]);
            } else {
                complete = false;
                message.reply("cinquième argument incorrect");
            }
        } else {
            equilibre = 50;
        }

        if (args[5] != undefined) {
            if (args[5].match(/[0-9]+/) && args[5] >= 1 && args[5] <= 10) {
                difficulte = parseInt(args[5]);
            } else {
                complete = false;
                message.reply("sixième argument incorrect");
            }
        } else {
            difficulte = 3;
        }

        if (complete === true) {
            min = 0;
            max = (forceJ1 + forceJ2) * difficulte;
            equilibre = max / 100 * equilibre;
            messagePublic = await message.channel.send("__**partie entre " + J1.username + "(j1) et " + J2.username + "(j2).**__, " + (10 * difficulte) + " round max");
            var round = 1;
            var choixJ1;
            var choixJ2;

            while (round <= (10*difficulte) && (choixJ1 !== 4 || choixJ2 !== 4) && equilibre > (max/100*10) && equilibre < (max - (max/100*10))) {

                choixJ1 = 0;
                choixJ2 = 0;
                messagej1 = await J1.send('initialisation de la partie contre ' + J2.username);
                messagej2 = await J2.send('initialisation de la partie contre ' + J1.username);
                if(round%5 == 0){
                    messagePublic = await message.channel.send("__**partie entre " + J1.username + "(j1) et " + J2.username + "(j2).**__, " + (10 * difficulte) + " round max");
                }
                var text = "j1🔷";
                for (var i = (max/100*10); i < (max - (max/100*10)); i = i + (max/18)){
                    if(i < equilibre) {
                        text = text + "🟦";
                    } else{
                        text = text + "🟧";
                    } 
                }
                text = text + "🔶j2";
                await messagePublic.edit(messagePublic.content + "\n\n__round " + round + " - " + equilibre + " / " + max + "__\n" + text);
                //console.log("round " + round + " longeur " + messagePublic.content.length)
                
                await Promise.all([
                    (async () => choixJ1 = await pfc(messagej1, round, J2.username, (equilibre + " / " + max + " , atteignez " + (max - (max/100*10)) + " pour gagner\n" + text)))(),
                    (async () => choixJ2 = await pfc(messagej2, round, J1.username, (equilibre + " / " + max + " , atteignez " + (max/100*10) + " pour gagner\n"+text)))()
                ])
                var arr = ["🔇", "⛰️", "📜", "⚔️", "❌" ];
                await messagePublic.edit(messagePublic.content + "\n"  + arr[choixJ1] + " vs " + arr[choixJ2]);
                await messagej1.edit(messagej1.content + "\n" + arr[choixJ1] + " vs " + arr[choixJ2] );
                await messagej2.edit(messagej2.content + "\n" + arr[choixJ1] + " vs " + arr[choixJ2] );
                //console.log(arr[choixJ1] + " vs " + arr[choixJ2]);

                if (choixJ1 == -1 || choixJ2 == -1) {
                    //console.log("erreur pas de reponse");
                    await messagePublic.edit(messagePublic.content+  " un des participant shouaite arreter");
                    messagej1.edit( messagej1.content + "\nun des participant **shouaite arreter**");
                    messagej2.edit( messagej2.content + "\nun des participant **shouaite arreter**");
                } else if (choixJ1 == 0 || choixJ2 == 0) {
                    //console.log("erreur pas de reponse");
                    await messagePublic.edit(messagePublic.content+  " erreur: un des participants n'a pas répondu");
                    messagej1.edit( messagej1.content + "\nerreur: un des participants **n'a pas répondu**");
                    messagej2.edit( messagej2.content + "\nerreur: un des participants **n'a pas répondu**");
                } else if (choixJ1 == choixJ2) {
                    //console.log("equalité");
                    await messagePublic.edit(messagePublic.content + " egalité");
                    messagej1.edit( messagej1.content + "\n**egalité**");
                    messagej2.edit( messagej2.content + "\n**egalité**");
                } else if( (choixJ1 == 1 && choixJ2 == 3) || (choixJ1 == 2 && choixJ2 == 1) || (choixJ1 == 3 && choixJ2 == 2)) {
                    //console.log("victoire j1");
                    await messagePublic.edit(messagePublic.content + " victoire de **J1**");
                    messagej1.edit( messagej1.content + "\n**victoire**");
                    messagej2.edit( messagej2.content + "\n**echec**");
                    equilibre = await equilibre + forceJ1;
                } else {
                    //console.log("victoire j2");
                    await messagePublic.edit(messagePublic.content + " victoire de **J2**");
                    messagej1.edit( messagej1.content + "\n**echec**");
                    messagej2.edit( messagej2.content + "\n**victoire**");
                    equilibre = await equilibre - forceJ2;
                }
                round = await round + 1;

            }

            await messagePublic.edit(messagePublic.content + "\n\n__**score finale : **__"  + equilibre + " / " + max);
            if(equilibre < forceJ1){
                await messagePublic.edit(messagePublic.content + "\n victoire de <@" + J2.id + ">");
                await J1.send("echec :(");
                await J2.send("victoire !");
            } else if (equilibre > (max - (max/100*10))){
                await messagePublic.edit(messagePublic.content + "\n victoire de <@" + J1.id + ">");
                await J2.send("echec :(");
                await J1.send("victoire !");
            } else if(round > (10 * difficulte)){
                await messagePublic.edit(messagePublic.content + "\n limite de tours dépassée : égalité");
                await J1.send("limite de tours dépassée : égalité");
                await J2.send("limite de tours dépassée : égalité");
            } else {
                await messagePublic.edit(messagePublic.content + "\n limite de tours dépassée : égalité");
                await J1.send("deux abandons : égalité");
                await J2.send("deux abandons : égalité");
            }
        }

        async function pfc(message, round, nomEnnemi, texteEquilibre) {
            await message.edit("**combat contre " + nomEnnemi + "**\n__round " + round + " - " + texteEquilibre + "__\nréagissez ⛰️, 📜 ou ⚔️ pour faire votre mouvement. \nréagissez ❌ pour demander d'arrêter le combat (paix blanche)");
            await message.react("⛰️");
            await message.react("📜");
            await message.react("⚔️");
            await message.react("❌");
            const filter = (reaction, user) => {
                return ["⛰️", "📜", "⚔️", "❌"].includes(reaction.emoji.name);
            };
            var ret = 0
            await message.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    //console.log("react");
                    const reaction = collected.first();

                    if (reaction.emoji.name === '⛰️') {
                        ret = 1;
                    } else if (reaction.emoji.name === '📜') {
                        ret = 2;
                    } else if (reaction.emoji.name === '⚔️') {
                        ret = 3;
                    } else if (reaction.emoji.name === '❌') {
                        ret = 4;
                    }
                })
                .catch(collected => {
                    //console.log("pas react");
                    ret = 0;
                });
            return ret;
        }
    },
};