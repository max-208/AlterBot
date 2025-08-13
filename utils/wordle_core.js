const {wordleDatabase} = require('utils/wordle_database.js');
const fs = require('fs');
const utilities = require('utils/utilities.js');
const {AttachmentBuilder, EmbedBuilder} = require('discord.js');

const letterScore = {
    "A" : 1,
    "B" : 3,
    "C" : 3,
    "D" : 2,
    "E" : 1,
    "F" : 4,
    "G" : 2,
    "H" : 4,
    "I" : 1,
    "J" : 8,
    "K" : 10,
    "L" : 1,
    "M" : 2,
    "N" : 1,
    "O" : 1,
    "P" : 3,
    "Q" : 8,
    "R" : 1,
    "S" : 1,
    "T" : 1,
    "U" : 1,
    "V" : 4,
    "W" : 10,
    "X" : 10,
    "Y" : 10,
    "Z" : 10
};

const wordleCore = function () {

    this.getWord = async function () {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + '/wordle_words.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error("Error reading word file :", err);
                    reject(err);
                } else {
                    const words = data.split('\n').filter(word => word.trim() !== '');
                    const randomWord = words[Math.floor(Math.random() * words.length)].trim().toUpperCase();
                    resolve(randomWord);
                }
            });
        });
    }

    this.computeWordValue = function (word) {
        return word.reduce((acc, cur) => {
            const letter = cur.toUpperCase();
            if (letterScore[letter] !== undefined) {
                return acc + letterScore[letter];
            } else {
                console.warn(`Letter ${letter} not found in letterScore mapping.`);
                return acc;
            }
        })
    }

    this.createGame = async function () {
        const word = await this.getWord();
        const score = await this.computeWordValue(word);
        await wordleDatabase.newGame(word, new Date().valueOf(), score);
    }

    this.getCurrentStamp = async function () {
        const row = await wordleDatabase.getCurrentGame();
        if (!row) {
            console.warn("No current game found in the database.");
            return null;
        }
        return row.date;
    }
    this.getCurrentWord = async function () {
        const row = await wordleDatabase.getCurrentGame();
        if (!row) {
            console.warn("No current game found in the database.");
            return null;
        }
        return row.word;
    }
    this.verifyWord = async function (word, compareTo = null) {
        /**
         * Verify the word against the current word.
         * Returns an array of 5 integers representing the validity of each letter:
         * 0: not in word, 1: in word but wrong position, 2: in word and correct position
         *
         * @param {string} word - The word to verify.
         * @param {string|null} compareTo - The word to compare against. If null, uses the current word.
         * @return {Promise<Array<number>>} - A promise that resolves to an array of integers.
         */
        if (word === null){
            return null
        }
        const currentWord = compareTo ?? await this.getCurrentWord();
        const currentWordArr = currentWord.split('');
        const wordArr = word.split('');
        let result = [0, 0, 0, 0, 0];
        let letterCount = {};

        // Compter les lettres du mot cible
        for (let c of currentWordArr) {
            letterCount[c] = (letterCount[c] || 0) + 1;
        }

        // Première passe : lettres bien placées
        for (let i = 0; i < wordArr.length; i++) {
            if (wordArr[i] === currentWordArr[i]) {
                result[i] = 2;
                letterCount[wordArr[i]]--;
            }
        }

        // Deuxième passe : lettres mal placées
        for (let i = 0; i < wordArr.length; i++) {
            if (result[i] === 0 && letterCount[wordArr[i]] > 0) {
                result[i] = 1;
                letterCount[wordArr[i]]--;
            }
        }

        return result;
    };
    this.registerPlayerToGame = async function (playerId) {
        const gameStamp = await this.getCurrentStamp();
        const player = await wordleDatabase.getPlayer(playerId);
        if (!player) {
            await wordleDatabase.newPlayer(playerId);
        }
        await wordleDatabase.registerPlayerToGame(playerId, gameStamp);
    };
    this.updatePlayerStats = async function (playerId, streak) {
        const guesses = (await wordleDatabase.getPlayerGuesses(playerId)).sort();
        const totalScore = guesses.reduce((sum, guess) => sum + guess.score, 0);
        const average = totalGuesses / guesses.length;
        const median = guesses[Math.floor(guesses.length / 2)].score;
        const stats = {
            first_game_date: streak.last_game_date,
            last_game_date: streak.last_game_date,
            current_streak: streak.current_streak,
            longest_streak: streak.longest_streak,
            score_average: average,
            score_median: median,
            score_total: totalScore
        }
        await wordleDatabase.updatePlayerStats(playerId, stats);
    };

    this.computePlayerScore = async function (playerId, dateStamp) {
        const parameters = {
            externalScaling : 1,
            internalAdjustment : 30,
            magic1 : 2,
            magic2 : 2/this.magic1
        }

        const guessesAndGame = await wordleDatabase.getGuessAndGame(playerId, dateStamp);
        let score = 0;

        const guessesArr = [
            guessesAndGame.first_guess,
            guessesAndGame.second_guess,
            guessesAndGame.third_guess,
            guessesAndGame.fourth_guess,
            guessesAndGame.fifth_guess,
            guessesAndGame.sixth_guess
        ];

        let scores = []

        for (let guess of guessesArr) {
            const verifiedGuess = await this.verifyWord(guess);
            scores.push(verifiedGuess);
        }
        score = scores.reduce((acc, cur) => acc + cur.reduce((a, b) => a + b, 0), 0);

        const wordScoreFactor = guessesAndGame.word_score + parameters.internalAdjustment;

        let guessCount = 0
        if (scores[5].reduce((acc, cur) => acc + cur, 0) <= 10) {
            guessCount = 7
        } else {
            guessCount = guessesArr.filter(guess => guess !== null).length;
        }

        const pointsFromNthGuess = wordScoreFactor * (-(guessCount - 1)/6 + 1)
        const pointsFromScore = wordScoreFactor / parameters.magic1 * (1 - Math.exp(- parameters.magic1 * parameters.magic2 * score / wordScoreFactor))

        return Math.round((pointsFromNthGuess + pointsFromScore) * parameters.externalScaling);
    };

    this.getNumberOfGuess = async function (playerId, dateStamp) {
        const guesses = await wordleDatabase.getPlayerActualGame(playerId, dateStamp);
        if (!guesses) {
            console.warn("No game found for player with the given timestamp.");
            return null;
        }
        const guessesArr = [
            guesses.first_guess,
            guesses.second_guess,
            guesses.third_guess,
            guesses.fourth_guess,
            guesses.fifth_guess,
            guesses.sixth_guess
        ];
        return guessesArr.filter(guess => guess !== null).length;
    }

    this.insertGuessIntoDb = async function (playerId, guess) {
        const dateStamp = await this.getCurrentStamp();
        const numberOfGuess = await this.getNumberOfGuess(playerId, dateStamp);

        if (numberOfGuess === null) {
            return;
        } else if (numberOfGuess >= 6) {
            return false;
        } else if (numberOfGuess === 6 || (await this.verifyWord(guess)).reduce((a, b) => a + b, 0) === 10) { //si le jeu est fini on calcule le score
            const score = await this.computePlayerScore(playerId, dateStamp);
            await wordleDatabase.insertNewGuess(playerId, guess, dateStamp, numberOfGuess, score);
            if (numberOfGuess === 6 && (await this.verifyWord(guess)).reduce((a, b) => a + b, 0) === 10) {
                //game is lost
                await this.updateStreak(playerId, dateStamp, false);
            } else {
                await this.updateStreak(playerId, dateStamp, true);
            }
        } else {
            await wordleDatabase.insertNewGuess(playerId, guess, dateStamp, numberOfGuess);
            return true;
        }
    }

    this.updateStreak = async function(playerId, dateStamp, won) {
        const player = await wordleDatabase.getPlayer(playerId);
        if (!player) {
            console.error("Player not found in the database while trying to update streak.");
        }
        const streak = {
            first_game_date: player.first_game_date ?? dateStamp,
            last_game_date: dateStamp,
            current_streak: won ? player.current_streak + 1 : 0,
            longest_streak: Math.max(player.longest_streak, this.current_streak),
        }
        await this.updatePlayerStats(playerId, streak)
    }

    this.verifyPlayerStartedGame = async function (playerId) {
        const gameStamp = await this.getCurrentStamp();
        return await wordleDatabase.getPlayerActualGame(playerId, gameStamp);

    }

    this.createSVGFromLettersList = async function (guessesArray, validatedArray) {
        /**
         * Create an SVG representation of the guesses grid
         *
         * @param {Array<string>} guessesArray - The array of guesses made by the player.
         * @param {Array<Array<number>>} validatedArray - The array of arrays containing the validity of each letter in the guesses.
         * @return {Promise<string>} A promise that resolves to the SVG string.
         */
        const colors = {
            font : 'hsl(0, 0%, 100%)',
            stroke : 'hsl(0, 0%, 15%)',
            null : 'hsl(0, 0%, 0%)',
            0 : 'hsl(0, 0%, 40%)', // Gray
            1 : 'hsl(45, 100%, 40%)', // Yellow
            2 : 'hsl(120, 100%, 40%)' // Green
        }

        const scale = 1.5;
        const rows = 6;
        const cols = 5;
        const cellSize = 20 * scale;
        const margin = 6 * scale;
        const gap = 24 * scale;
        const svgWidth = margin * 2 + gap * (cols - 1) + cellSize;
        const svgHeight = margin * 2 + gap * (rows - 1) + cellSize;

        let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
    <rect width="100%" height="100%" fill="hsl(0, 0%, 10%)"/>
`;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const { x, y, cellSize, textX, textY } = getCellParams(row, col, scale);
                let letter = ' ';
                let color = colors.null;
                if (guessesArray[row] && guessesArray[row][col]) {
                    letter = guessesArray[row][col];
                    color = colors[validatedArray[row][col]];
                }
                svgContent += `    <rect x="${x}" y="${y}" height="${cellSize}" width="${cellSize}" fill="${color}" stroke="${colors.stroke}" stroke-width="${2 * scale}"/>\n`;
                svgContent += `    <text x="${textX}" y="${textY}" font-size="${12 * scale}" font-family="Arial" fill="${colors.font}" text-anchor="middle">${letter}</text>\n`;
            }
        }

        svgContent += `</svg>\n`;

        return svgContent;
    }


    this.buildGuessEmbed = async function (playerId) {
        const game = await wordleDatabase.getPlayerActualGame(playerId, await this.getCurrentStamp());
        const guesses = [
            game.first_guess,
            game.second_guess,
            game.third_guess,
            game.fourth_guess,
            game.fifth_guess,
            game.sixth_guess
        ];
        let validatedArray = [];
        for (const guess of guesses) {
            if (guess) {
                const verified = await this.verifyWord(guess, game.word);
                validatedArray.push(verified);
            } else {
                validatedArray.push([null, null, null, null, null]);
            }
        }
        const svgContent = await this.createSVGFromLettersList(guesses, validatedArray);
        const pngPath = await utilities.convertSVGtoPNG(svgContent);
        const attachment = new AttachmentBuilder(pngPath, { name: 'wordle_grid.png' });
        const embed = new EmbedBuilder()
            .setTitle("Wordle")
            .setDescription(`${guesses.filter(g => g).length}/6`)
            .setFields(
                {name: "score", value: `${game.score}`, inline: true},
            )
            .setColor('Blue')
            .setImage('attachment://wordle_grid.png')
        return {
            embed: embed,
            file: attachment,
            validatedArray: validatedArray,
        };
    }

    this.getPlayerStatsEmbed = async function (playerId) {
        const player = await wordleDatabase.getPlayer(playerId);
        if (!player) {
            return new EmbedBuilder()
                .setTitle("Wordle")
                .setDescription("Aucun joueur trouvé avec cet ID.")
                .setColor('Red');
        } else {
            return new EmbedBuilder()
                .setTitle("Wordle")
                .setDescription(`Statistiques de <@${playerId}>`)
                .addFields(
                    {name: "Première partie", value: new Date(player.first_game_date).toLocaleDateString(), inline: true},
                    {name: "Dernière partie", value: new Date(player.last_game_date).toLocaleDateString(), inline: true},
                    {name: "\u200B", value: "\u200B"}, // Empty field for spacing
                    {name: "Streak actuel", value: player.current_streak.toString(), inline: true},
                    {name: "Streak le plus long", value: player.longest_streak.toString(), inline: true},
                    {name: "\u200B", value: "\u200B"}, // Empty field for spacing
                    {name: "Score moyen", value: player.score_average.toFixed(2).toString(), inline: true},
                    {name: "Score médian", value: player.score_median.toFixed(2).toString(), inline: true},
                    {name: "Score total", value: player.score_total.toString(), inline: true}
                )
                .setColor('Blue');
        }
    }

    this.getPlayerTop = async function () {
        const players = await wordleDatabase.getAllPlayers()

    }
}

const wordle = new wordleCore();
module.exports = {
    wordle: wordle
}