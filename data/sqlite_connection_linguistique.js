const sqlite3 = require('sqlite3').verbose();

/**
 * get a connection to the database
 * @param {string} filename - the filename
 * @return {Database} - the connection to the database
 */
function initializeConnection(filename) {
  const db = new sqlite3.Database(filename);
  db.loadExtension(__dirname + '/spellfix', (err) => {
    if (err) throw err;
  });
  return db;
}
module.exports = initializeConnection(__dirname + '/database_linguistique.db');
