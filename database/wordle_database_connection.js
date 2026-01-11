const sqlite3 = require('sqlite3').verbose();

module.exports = new sqlite3.Database("./data/wordle_score.db")