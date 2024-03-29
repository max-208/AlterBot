const { SlashCommandBuilder } = require('discord.js');
const { randomInt } = require("crypto");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('demineur')
    .setDescription('crées un démineur')
    .addIntegerOption(option =>
        option.setName('dimension_x')
        .setDescription('dimension x')
        .setRequired(true))
    .addIntegerOption(option =>
        option.setName('dimension_y')
        .setDescription('dimension y')
        .setRequired(true))
    .addIntegerOption(option =>
        option.setName('nombres_de_mines')
        .setDescription('nombres de mines')
        .setRequired(true)),
    async execute(interaction) {
        const args = [interaction.options.getInteger('dimension_x'), interaction.options.getInteger('dimension_y'), interaction.options.getInteger('nombres_de_mines')];
        const symbol = {
            "*": "💥",
            "0": "⬛",
            "1": "1️⃣",
            "2": "2️⃣",
            "3": "3️⃣",
            "4": "4️⃣",
            "5": "5️⃣",
            "6": "6️⃣",
            "7": "7️⃣",
            "8": "8️⃣",
            "9": "9️⃣"
        }
        var dimX = 9;
        if (args[0] != undefined) {
            dimX = parseInt(args[0]);
        }

        var dimY = 9;
        if (args[1] != undefined) {
            dimY = parseInt(args[1]);
        }

        var nbBombes = Math.round(dimX * dimY / 10);
        if (args[2] != undefined) {
            nbBombes = parseInt(args[2]);
        }

        var board = new Array(dimX);

        for (var i = 0; i < board.length; i++) {
            board[i] = new Array(dimY);
        }

        if (nbBombes > (dimX * dimY)/2 || dimX*dimY > 100 || dimX < 2 || dimY <2) {
            interaction.reply("plateau non valide, il doit avoir moins de 100 cases et ne doit pas contenir plus de 50% de bombes")
        } else {
            for (let i = 0; i < dimX; i++) {
                for (let j = 0; j < dimY; j++) {
                    board[i][j] = 0;
                }
            }

            bombesPlacees = 0;
            while (bombesPlacees < nbBombes) {
                rX = randomInt(0, dimX);
                rY = randomInt(0, dimY);
                if (rX > 0 && rY > 0) {
                    if (board[rX][rY] != "*") {
                        board[rX][rY] = "*";
                        bombesPlacees = bombesPlacees + 1;
                    }
                }
            }

            for (let i = 0; i < dimX; i++) {
                for (let j = 0; j < dimY; j++) {
                    if (board[i][j] != "*") {
                        num = 0;
                        if (i != 0 && j !=0 && board[i - 1][j - 1] == "*") {
                            num++;
                        }
                        if (i != 0 && board[i - 1][j] == "*") {
                            num++;
                        }
                        if (i != 0 && j !=dimY-1 && board[i - 1][j + 1] == "*" ) {
                            num++;
                        }
                        if (j !=0 && board[i][j - 1] == "*" ) {
                            num++;
                        }
                        if (j !=dimY-1 && board[i][j + 1] == "*") {
                            num++;
                        }
                        if (i != dimX-1 && j !=0 && board[i + 1][j - 1] == "*" ) {
                            num++;
                        }
                        if (i != dimX-1 && board[i + 1][j] == "*" ) {
                            num++;
                        }
                        if (i != dimX-1 && j !=dimY-1 && board[i + 1][j + 1] == "*") {
                            num++;
                        }
                        board[i][j] = num;
                    }
                }
            }

            texte = "\n";
            for (let i = 0; i < dimX; i++) {
                for (let j = 0; j < dimY; j++) {
                    if( i == 0 || j == 0){
                        texte = texte + symbol[board[i][j]] ;
                    } else {
                        texte = texte + "||" + symbol[board[i][j]] + "||";
                    }
                }
                texte = texte + "\n";
            }
            interaction.reply(texte);
        }
    },
};
