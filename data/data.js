var db_connection = require('./sqlite_connection');
var linguistique_connection = require('./sqlite_connection_linguistique');

var premierAvril_dao = require('./dao_premierAvril');
var linguistique_dao = require('./dao_linguistique');
var soundex = require('./soundex');

var alphabet = require("./alphabet.json"); //dictionnaire associant le pierrick latin au pierrick georgien / cyrilique 
var correspondance = require('./phonetique.json'); //dictionnaire (json) associant lettres pierrick et alphabet phonétique international

module.exports = {
    db: db_connection, 
    premierAvril_dao: premierAvril_dao,
    linguistique_connection: linguistique_connection,
    db_linguistique: linguistique_dao,
    soundex: soundex,
    correspondance: correspondance,
    alphabet: alphabet
};
