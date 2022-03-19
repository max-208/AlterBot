var db_connection = require('./sqlite_connection');

var premierAvril_dao = require('./dao_premierAvril');

module.exports = {
    db: db_connection, 
    premierAvril_dao: premierAvril_dao
};