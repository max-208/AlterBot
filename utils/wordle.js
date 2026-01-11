const { wordle} = require("utils/wordle_core.js");
const fs = require('fs');

const getWordList = function() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/wordle_words.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading word file:", err);
                reject(err);
            } else {
                const words = data.split('\n').filter(word => word.trim() !== '');
                resolve(words.map(word => word.trim().toUpperCase()));
            }
        });
    });
};

const wordList = getWordList();

module.exports = {
    wordle: wordle,
    wordList: wordList,
};