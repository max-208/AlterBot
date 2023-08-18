const sqlite3 = require('sqlite3').verbose();

function initializeConnection(filename){
    let db = new sqlite3.Database(filename);
    db.loadExtension(__dirname + '/spellfix', (err) => {
        if (err) throw err;
    });
    return db;
}
module.exports = initializeConnection(__dirname + "/database_linguistique.db");