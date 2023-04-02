var linguistique_connection = require('./sqlite_connection_linguistique');

var linguistique_dao = require('./dao_linguistique');
var soundex = require('./soundex');

var alphabet = require("./alphabet.json"); //dictionnaire associant le pierrick latin au pierrick georgien / cyrilique 
var correspondance = require('./phonetique.json'); //dictionnaire (json) associant lettres pierrick et alphabet phonétique international

module.exports = {
    linguistique_connection: linguistique_connection,
    db: linguistique_dao,
    soundex: soundex,
    correspondance: correspondance,
    alphabet: alphabet,
    awing_id: "1004518765834289302"
};
