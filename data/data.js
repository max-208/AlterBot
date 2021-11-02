var db_connection = require('./sqlite_connection');

var joueur_dao = require('./dao_joueur');
var province_dao = require('./dao_province');
var ville_dao = require('./dao_ville');
var relation_dao = require('./dao_relation');
var influence_dao = require('./dao_influence');

module.exports = {
    db: db_connection, 
    joueur_dao: joueur_dao,
    province_dao: province_dao,
    ville_dao: ville_dao,
    relation_dao: relation_dao,
    influence_dao: influence_dao
};