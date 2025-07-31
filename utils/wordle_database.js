const db = require('./wordle_database_connection');

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
    this.newGame = async function(word, date){
        return new Promise((resolve, reject) => {
           db.run("INSERT INTO games (word, date) VALUES (?, ?)", [word, date], err => {
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
    }
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
    }
}

module.exports = {
    "db_connection": db,
    "wordleDatabase": wordleDatabase
}