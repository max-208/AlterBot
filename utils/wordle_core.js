const {wordleDatabase} = require('./wordle_database.js');
const fs = require('fs');

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

    this.createGame = async function () {
        const word = await this.getWord();
        wordleDatabase.newGame(word, new Date().valueOf());
    }

    this.getCurrentWord = async function () {
        const row = await wordleDatabase.getCurrentGame();
        return row.word;
    }
    this.verifyWord = async function (word) {
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
        const guesses = awaitwordleDatabase.getPlayerGuesses(playerId);
        if (guesses.length === 0) {
            console.warn("No guesses found for player");
            return null;
        }
        const scores = guesses.map(guess => guess.score).sort();
        return scores[Math.floor(scores.length / 2)];
    };
    this.updatePlayerStats = async function (playerId) {
        const average = await this.computePlayerAverage(playerId);
        const median = await this.computePlayerMedian(playerId);

    }
}