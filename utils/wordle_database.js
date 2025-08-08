const db = require('utils/wordle_database_connection');

const wordleDatabase = function(){
    this.getCurrentGame = async function(){
        return new Promise((resolve, reject) => {
            db.get("SELECT date, word FROM games ORDER BY date DESC LIMIT 1", (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else if (row) {
                    resolve(row);
                } else {
                    console.warn("No current game found in the database.");
                    reject(null);
                }
            });
        });
    };
    this.getPreviousGame = async function(){
        return new Promise((resolve, reject) => {
            db.get("SELECT date, word FROM games ORDER BY date DESC LIMIT 1 OFFSET 1", (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else if (row) {
                    resolve(row);
                } else {
                    console.warn("No previous game found in the database.");
                    reject(null);
                }
            });
        });
    }
    this.newGame = async function(word, date, score){
        return new Promise((resolve, reject) => {
           db.run("INSERT INTO games (word, date, word_score) VALUES (?, ?, ?)", [word, date, score], err => {
             if (err) {
                 console.error("Error inserting new game into database:", err);
                 reject(err);
             }
           });
        });
    };
    this.newPlayer = async function(id){
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO players (id) VALUES (?)", [id], err => {
                if (err) {
                    console.error("Error inserting new player into database:", err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    this.getGuessAndGame = async function(playerId, gameStamp){
        return new Promise((resolve, reject) => {
            db.run(`
                SELECT games.date as date, games.word as word, games.word_score as word_score,
                guesses.player_id as player_id, guesses.score as score, guesses.first_guess as first_guess
                guesses.second_guess as second_guess, guesses.third_guess as third_guess, guesses.fourth_guess as fourth_guess, 
                guesses.fifth_guess as fifth_guess, guesses.sixth_guess as sixth_guess
                FROM games 
                JOIN guesses ON games.date = guesses.date
                WHERE games.date = ? and guesses.player_id = ?`,
                [gameStamp, playerId], (err, rows) => {
                    if (err) {
                        console.error("Error fetching game and guesses from database:", err);
                        reject(err);
                    } else if (rows) {
                        resolve(rows);
                    } else {
                        console.warn("No game found for the given timestamp.");
                    }
                }
            )
        })
    }

    this.getWordValue = async function(dateStamp){
        return new Promise((resolve, reject) => {
            db.get("SELECT word_score FROM games WHERE date = ?", [dateStamp], (err, row) => {
                if (err) {
                    console.error("Error fetching word value from database:", err);
                    reject(err);
                } else if (row) {
                    resolve(row.word_score);
                } else {
                    console.warn("No game found for the given timestamp.");
                    resolve(null);
                }
            });
        })
    }
    this.getPlayer = async function(id){
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM players WHERE id = ?", [id], (err, row) => {
                if (err) {
                    console.error("Error fetching player from database:", err);
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            });
        });
    };
    this.getPlayerGuesses = async function(id){
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM guesses WHERE player_id = ? ", [id], (err, rows) => {
                if (err) {
                    console.error("Error fetching player game from database:", err);
                    reject(err);
                } else if (rows) {
                    resolve(rows);
                } else {
                    resolve(null);
                }
            });
        });
    };
    this.updatePlayerStats = async function(playerId, stats){
        return new Promise((resolve, reject) => {
            db.run("UPDATE players SET games_played = ?, games_won = ?, average_guesses = ? WHERE id = ?",
                [stats.gamesPlayed, stats.gamesWon, stats.averageGuesses, playerId], err => {
                if (err) {
                    console.error("Error updating player stats in database:", err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };
    this.getPlayerActualGame = async function(playerId, gameStamp){
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM guesses WHERE player_id = ? AND date = ?", [playerId, gameStamp], (err, row) => {
                if (err) {
                    console.error("Error fetching player's game from database:", err);
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    console.warn("No game found for player with the given timestamp.");
                    resolve(null);
                }
            });
        });
    }
    this.addPlayerToGame = async function(playerId, gameStamp){
        return new Promise((resolve, reject) => {
           db.run("INSERT INTO guesses (date, player_id, score) VALUES (?, ?, 0)", [gameStamp, playerId], err => {
                if (err) {
                    console.error("Error inserting player into game in database:", err);
                    reject(err);
                } else {
                    resolve();
                }
           })
        });
    }
    this.insertNewGuess = async function(playerId, gameStamp, guess, guessNumber){
        const map = {
            0: 'first_guess',
            1: 'second_guess',
            2: 'third_guess',
            3: 'fourth_guess',
            4: 'fifth_guess',
            5: 'sixth_guess'
        };
        if (guessNumber < 0 || guessNumber > 5) {
            console.error("Invalid guess number:", guessNumber);
            return Promise.reject("Invalid guess number. Must be between 0 and 5.");
        }
        const guessField = map[guessNumber];
        return new Promise((resolve, reject) => {
            db.run("UPDATE guesses SET ${guessField} = ? WHERE player_id = ? AND date = ?", [guess, playerId, gameStamp], err => {
                if (err) {
                    console.error("Error inserting new guess into database:", err);
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
}

module.exports = {
    "db_connection": db,
    "wordleDatabase": new wordleDatabase()
}