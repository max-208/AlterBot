//comment ca je copie ton système comme un gros porc ?
const db = require('./sqlite_connection_linguistique.js');
const soundex = require('./soundex');

var dao_linguistique = function(){

    this.addProposition = async function(args) {
        return new Promise(async function(resolve,reject){
            const query = "INSERT INTO suggestion VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            db.run(query,[args.id, args.instigateur, args.francais, args.pierrick, args.phonetique, args.commentaire, args.definition, args.etymologie, args.class, args.type, args.cyrilic, args.hangeul],(err, rows)=>{
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.isPropositionIdTaken = async function(id) {
        return new Promise(async function(resolve,reject){
            const query = "SELECT * FROM suggestion WHERE id = ?;"
            db.each(query,[id],(err,row)=>{
                if(err /*|| row.length > 0*/) reject(err);
                else resolve(row);
            });
        });
    } 

    this.getSuggest = async function(id) {
        return new Promise(async function(resolve,reject){
            const query = "SELECT * FROM suggestion WHERE id = ?;"
            db.each(query,[id],(err,row)=>{
                if(err) reject(err);
                else resolve(row);
            });
        });
    } 

    this.lookToProposition = async function(offset) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion LIMIT 1 OFFSET ?;"
            db.all(query,[offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            }); 
        });
    }  

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

    this.validateAddition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "INSERT INTO dictionnaire (francais, pierrick, phonétique, commentaire, définition, étymologie, classe, cyrilic, hangeul ) SELECT francais, pierrick, phonetique, commentaire, definition, etymologie, class, cyrilic, hangeul FROM suggestion WHERE id = ?;"
            db.run(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.purgeProposition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "DELETE FROM suggestion WHERE id = ?;"
            db.run(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.rejectProposition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "DELETE FROM suggestion WHERE id = ?;"
            db.run(query, [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.getPropositionById = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion WHERE id = ?;"
            db.get(query, [id], (err, rows) =>{
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.isIdValidWord = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE id = ?;"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else if (rows.id == id) resolve(true);
            });
        });
    }

    this.isIdValidSuggestion = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion WHERE id = ?;"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else if (rows.id == id) resolve(true);
            });
        });
    }

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

    this.getWord = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE id = ?;"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.searchByFrench = async function(soundexedMot, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE soundexfr = ? LIMIT 5 OFFSET ?;";
            db.all(query, [soundexedMot, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.searchByPierrick = async function(soundexedMot, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE soundexprk = ? LIMIT 5 OFFSET ?;";
            db.all(query, [soundexedMot, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.searchByFrenchRegex = async function(regex, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE francais LIKE ? LIMIT 5 OFFSET ?;";
            db.all(query, [regex, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.searchByPierrickRegex = async function(regex, offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE pierrick LIKE ? LIMIT 5 OFFSET ?;";
            db.all(query, [regex, offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }


}
const dao = new dao_linguistique();
module.exports = dao;