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
            db.run("UPDATE players SET  first_game_date = ?, last_game_date = ?, current_streak = ?, longest_streak = ?, score_average = ?, score_median = ?, score_total = ? WHERE id = ?",
                [stats.first_game_date, stats.last_game_date, stats.current_streak, stats.longest_streak, stats.score_average, stats.score_median, stats.score_total, playerId], err => {
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
    this.insertNewGuess = async function(playerId, gameStamp, guess, guessNumber, score = null){
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
        let query;
        if (score){
            query = `UPDATE guesses SET ${guessField} = ?, score = ? WHERE player_id = ? AND date = ?`;
        } else {
            query = `UPDATE guesses SET ${guessField} = ? WHERE player_id = ? AND date = ?`;
        }
        return new Promise((resolve, reject) => {
            db.run(query, [guess, score, playerId, gameStamp], err => {
                if (err) {
                    console.error("Error inserting new guess into database:", err);
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
    this.getAllPlayers = async function(limit = 10, page = 0){
        return new Promise((resolve, reject) => {
            db.all("SELECT id,  FROM players ORDER BY score_total DESC LIMIT ? OFFSET ?", [limit, page * limit], (err, rows) => {
                if (err) {
                    console.error("Error fetching all players from database:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = {
    "db_connection": db,
    "wordleDatabase": new wordleDatabase()
}