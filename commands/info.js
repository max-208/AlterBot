var fs = require("fs");
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
        let userId = message.author.id;
        let dataUser = joueurs[userId]
        if(dataUser != undefined){
            message.channel.send("or : " + dataUser.or )
            message.channel.send("foi : " + dataUser.foi )
        } else {
            message.channel.send("je n'ai aucune information sur toi :0");
        }
        
        
        //jsonContent.max.info = "ewe";
        //let retour = JSON.stringify(jsonContent, null, 2);
        //fs.writeFileSync('data/joueurs.json', retour);

    },
};
