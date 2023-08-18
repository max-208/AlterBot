//comment ca je copie ton système comme un gros porc ?
const db = require('./sqlite_connection_linguistique.js');
const soundex = require('./soundex');

//ensemble des fonctions communiquant avec la db
var dao_linguistique = function(){

    //add a proposition of word in the table suggestion
    this.addProposition = async function(args) {
        return new Promise(async function(resolve,reject){
            const query = "INSERT INTO suggestion VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            db.run(query,[args.id, args.instigateur, args.francais, args.pierrick, args.phonetique, args.commentaire, args.definition, args.etymologie, args.class, args.type, args.cyrilic, args.hangeul],(err, rows)=>{
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //Get a suggestion by it's id 
    this.getSuggest = async function(id) {
        return new Promise(async function(resolve,reject){
            const query = "SELECT * FROM suggestion WHERE id = ?;"
            db.each(query,[id],(err,row)=>{
                if(err) reject(err);
                else resolve(row);
            });
        });
    } 

    //search all of the proposition
    this.lookToProposition = async function(offset) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion LIMIT 1 OFFSET ?;"
            db.all(query,[offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            }); 
        });
    }  

    //count the number of proposition
    this.countProposition = async function() {
        //le résultat est dans la clé 'count'
        return new Promise(async function(resolve, reject){
            const query = "SELECT COUNT(*) AS count FROM suggestion;"
            db.get(query, (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //copy a suggestion to the dictionnaire table
    this.validateAddition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "INSERT INTO dictionnaire (francais, pierrick, phonétique, commentaire, définition, étymologie, classe, cyrilic, hangeul ) SELECT francais, pierrick, phonetique, commentaire, definition, etymologie, class, cyrilic, hangeul FROM suggestion WHERE suggestion.id = ?;"
            db.run(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    //delete a proposition
    this.purgeProposition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "DELETE FROM suggestion WHERE id = ?;"
            db.run(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    //test if a word exist for a given id in dictionnaire table
    this.isIdValidWord = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE id = ?;"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else if (rows.id == id) resolve(true);
            });
        });
    }

    //test if a suggestion exist for a given id in suggestion table
    this.isIdValidSuggestion = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion WHERE id = ?;"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else if (rows.id == id) resolve(true);
            });
        });
    }

    //modify a word of the dictionnaire table
    this.editWord = async function(id, values) {
        return new Promise(async function(resolve, reject){
            const query = "UPDATE dictionnaire \
                            SET francais = ?, pierrick = ?, phonétique = ?, classe = ?,\
                            commentaire = ?, définition = ?, étymologie = ?, cyrilic = ?, hangeul = ?\
                            WHERE id = ?;"
            db.run(query, [values.francais, values.pierrick, values.phonétique, values.classe, values.commentaire, values.définition, values.étymologie, values.cyrilic, values.hangeul, id], (err, rows) => {
                if(err) reject(err);
                else {
                    soundex.soundexId(values.id);
                    resolve(rows);
                }
            });
        });
    }

    //modify a suggestion
    this.editSuggest = async function(id, values) {
        return new Promise(async function(resolve, reject){
            const query = "UPDATE suggestion \
                            SET francais = ?, pierrick = ?, phonetique = ?, class = ?,\
                            commentaire = ?, definition = ?, etymologie = ?, cyrilic = ?, hangeul = ?\
                            WHERE id = ?;"
            db.run(query, [values.francais, values.pierrick, values.phonetique, values.class, values.commentaire, values.definition, values.etymologie, values.cyrilic, values.hangeul, id], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //get a word by its id
    this.getWord = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE id = ?;"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //search a word by its french soundex
    this.searchByFrench = async function(soundexedMot, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE soundexfr = ? LIMIT 5 OFFSET ?;";
            db.all(query, [soundexedMot, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //search a word by its pierrick soundex
    this.searchByPierrick = async function(soundexedMot, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE soundexprk = ? LIMIT 5 OFFSET ?;";
            db.all(query, [soundexedMot, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //search a word by like operator on francais column
    this.searchByFrenchRegex = async function(regex, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE francais LIKE ? LIMIT 5 OFFSET ?;";
            db.all(query, [regex, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    //search a word by like operator on pierrrick column 
    this.searchByPierrickRegex = async function(regex, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE pierrick LIKE ? LIMIT 5 OFFSET ?;";
            db.all(query, [regex, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.searchByFrenchSpellfix = async function(mot){
        return new Promise(async function(resolve, reject){
            const query = "SELECT word, dictionnaire.id, dictionnaire.définition \
                           FROM francais \
                           INNER JOIN dictionnaire \
                           ON francais.word == dictionnaire.francais \
                           WHERE francais.word MATCH ?\
                           ORDER BY dictionnaire.id;";
            let id = {}; //pour éviter les doublons
            let rows = [];
            db.each(query, [mot], (err, row) => {
                if(err) reject(err);
                else if (!(row.id in id)){
                    id[`${row.id}`] = 1;
                    rows.push(row);
                    resolve(rows);
                }
            });
            
        });
    }
    this.searchByPierrickSpellfix = async function(mot){
        return new Promise(async function(resolve, reject){
            const query = "SELECT word, dictionnaire.id, dictionnaire.définition \
                           FROM pierrick \
                           INNER JOIN dictionnaire \
                           ON pierrick.word == dictionnaire.pierrick \
                           WHERE pierrick.word MATCH ?\
                           ORDER BY dictionnaire.id;";
            let id = {}; //pour éviter les doublons
            let rows = [];
            db.each(query, [mot], (err, row) => {
                if(err) reject(err);
                else if (!(row.id in id)){
                    id[`${row.id}`] = 1;
                    rows.push(row);
                    resolve(rows);
                }
            });
            
        });
    }
}
const dao = new dao_linguistique();
module.exports = dao;