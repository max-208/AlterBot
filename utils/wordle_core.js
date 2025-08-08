const {wordleDatabase} = require('utils/wordle_database.js');
const fs = require('fs');

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
    this.verifyWord = async function (word) {
        if (word === null){
            return null
        }
        const currentWord = await this.getCurrentWord();
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
    this.computePlayerAverage = async function (playerId) {
        const guesses = await wordleDatabase.getPlayerGuesses(playerId);
        if (guesses.length === 0) {
            console.warn("No guesses found for player");
            return null;
        }
        const totalGuesses = guesses.reduce((sum, guess) => sum + guess.score, 0);
        return totalGuesses / guesses.length;
    };
    this.computePlayerMedian = async function (playerId) {
        const guesses = await wordleDatabase.getPlayerGuesses(playerId);
        if (guesses.length === 0) {
            console.warn("No guesses found for player");
            return null;
        }
        const scores = guesses.map(guess => guess.score).sort();
        return scores[Math.floor(scores.length / 2)];
    };
    this.registerPlayerToGame = async function (playerId) {
        const gameStamp = await this.getCurrentStamp();
        const player = await wordleDatabase.getPlayer(playerId);
        if (!player) {
            await wordleDatabase.newPlayer(playerId);
        }
        await wordleDatabase.registerPlayerToGame(playerId, gameStamp);
    };
    this.updatePlayerStats = async function (playerId) {
        const average = await this.computePlayerAverage(playerId);
        const median = await this.computePlayerMedian(playerId);
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
        } else {
            await wordleDatabase.insertNewGuess(playerId, guess, dateStamp, numberOfGuess);
        }
    }

    this.verifyPlayerStartedGame = async function (playerId) {
        const gameStamp = await this.getCurrentStamp();
        const game = await wordleDatabase.getPlayerActualGame(playerId, gameStamp);
        if (!game) {
            return false
        }
        return true;
    }

    this.buildGuessEmbed = async function (playerId) {
        const game = await wordleDatabase.getPlayerActualGame(playerId, await this.getCurrentStamp());


    }
}

const wordle = new wordleCore();
module.exports = {
    wordle: wordle
}