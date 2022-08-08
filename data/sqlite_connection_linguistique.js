const sqlite3 = require('sqlite3').verbose();

function initializeConnection(filename){
    return new sqlite3.Database(filename);
}
module.exports = initializeConnection(__dirname + "/database_linguistique.db");