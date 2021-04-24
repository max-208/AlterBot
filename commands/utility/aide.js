const Discord = require('discord.js');
let utilites = require("../../utilities.js");
module.exports = {
	name: 'aide',
	description: 'vous aide dans ces temps difficiles',
	args: false, 				//mettre a true quand la commande nécésite des arguments
	//usage: '<arg1> <arg2>',	//décrit les arguments nécéssaires a la commande
	guildOnly: true,			//définit si la commande doit etre utilisé seulement sur le serveur
	cooldown: 5,				//cooldown en nombres de secondes
	aliases: ["help"],	//autres manières d'appeler la commande
	execute(message, args) {
		let embed = new Discord.MessageEmbed()
        .setDescription(
        "**liste de commandes**"+
        "\nPS: les <> {} [] etc ne sont pas a inserer dans la commande" +
        "\n **(mj) a!tour**         [{quantité de PM}]" +
        "\n **(mj) a!bataille**		<{j1}> <{j2}> <{force j1}> <{force j2}>  [{equilibre% (10-90)}] \n[{nb tour max (1-)}] [{difficulte (1-15)}]"+
        "\n"+
        "\n **a!rejoindre** 		<{nom du pays}...>"+
        "\n **a!info**			    [{mention joueur}]"+
        "\n **a!drapeau** 		    <{nouvelle url du drapeau}...>"+
        "\n **a!devise** 		    <{nouvelle devise}...>"+
        "\n **a!regime**            <{nouveau regime}...>"+
        "\n"+
        "\n **a!ajouterEnnemi** 	<{mention joueur}>..."+
        "\n **a!ajouterAllie** 	    <{mention joueur}>..."+
        "\n **a!enleverEnnemi** 	<{mention joueur}>..."+
        "\n **a!enleverAllie** 	    <{mention joueur}>..."+
        "\n **a!ameliorerStat** 	<{stat (armee|marine|science|culture|religion|economie)}> <{quantité (1-)}>"+
        "\n **a!ameliorerTerre**	<{nombre de cases (1-)}> [{commentaire mj}...]"+
        "\n"+
        "\n **a!provinceCreer** 	<{nom de la province}...>"+
        "\n **a!provinceNom** 		<{id province}> <{nouveau nom}...>"+
        "\n **a!provinceAjouter**   <{id province}> <{id ville}> [{id ville}...]"+
        "\n"+
        "\n **a!villeCreer**		<{nom de la ville}...> \\n [{commentaire mj}...]"+
        "\n **a!villeNom**		    <{id ville}> <{nouveau nom}...>"+
        "\n **a!villeInfo**		    [{mention joueur}|{id ville}]")
        .setColor(utilites.colBlue)
        .setFooter("< >  obligatoire    { }  champ a remplir    [ ]  facultatif    ( )  valeurs attendues    \n... plus d'un champ    \\n  entrée    %   pourcentage    x-y valeur entre x et y compris    |   alternative");
        message.reply(embed);
	},
};