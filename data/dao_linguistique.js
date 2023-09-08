/* eslint-disable max-len */
// comment ca je copie ton système comme un gros porc ?
const db = require('./sqlite_connection_linguistique.js');

/** ensemble des fonctions communiquant avec la db*/
const DaoLinguistique = function() {
  /**
   * add a proposition of word in the table suggestion
   * @param {{id: int, instigateur: string, francais: string, pierrick: string, phonetique: string, commentaire: string?, definition: string, etymologie: string, class: string, type: string, cyrilic: string?, hangeul: string?}} args - the arguments of the proposition
   * @return {Promise<int>} - 0 if success
  */
  this.addProposition = async function(args) {
    return new Promise(async function(resolve, reject) {
      const query = 'INSERT INTO suggestion VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
      db.run(query, [args.id, args.instigateur, args.francais, args.pierrick, args.phonetique, args.commentaire, args.definition, args.etymologie, args.class, args.type, args.cyrilic, args.hangeul], (err)=>{
        if (err) reject(err);
        else resolve(0);
      });
    });
  };

  /** Get a suggestion by it's id
   * @param {int} id - the id of the suggestion
   * @return {Promise<Object>} - the suggestion
  */
  this.getSuggest = async function(id) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM suggestion WHERE id = ?;';
      db.each(query, [id], (err, row)=>{
        if (err) reject(err);
        else resolve(row);
      });
    });
  };

  /** search the first proposition
   * @param {int} offset - the offset of the search
   * @return {Promise<Object>} - the first proposition
  */
  this.lookToProposition = async function(offset) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM suggestion LIMIT 1 OFFSET ?;';
      db.all(query, [offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  /**
   * count the number of proposition
   * @return {Promise<int>} - the number of proposition
   */
  this.countProposition = async function() {
    // le résultat est dans la clé 'count'
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT COUNT(*) AS count FROM suggestion;';
      db.get(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  /** add a word from a suggestion to the dictionnaire table
   * @param {int} id - the id of the suggestion
   * @return {Promise<int>} - 0 if success
  */
  this.validateAddition = async function(id) {
    return new Promise(async function(resolve, reject) {
      const query = 'INSERT INTO dictionnaire (francais, pierrick, phonétique, commentaire, définition, étymologie, classe, cyrilic, hangeul ) SELECT francais, pierrick, phonetique, commentaire, definition, etymologie, class, cyrilic, hangeul FROM suggestion WHERE suggestion.id = ?;';
      db.run(query, [id], (err) => {
        if (err) reject(err);
        else resolve(0);
      });
    });
  };

  /** delete a proposition
   * @param {int} id - the id of the proposition
   * @return {Promise<int>} - 0 if success
  */
  this.purgeProposition = async function(id) {
    return new Promise(async function(resolve, reject) {
      const query = 'DELETE FROM suggestion WHERE id = ?;';
      db.run(query, [id], (err) => {
        if (err) reject(err);
        else resolve(0);
      });
    });
  };

  /** test if an id is already used in dictionnaire table
   * @param {int} id - the id of the word
   * @return {Promise<boolean>} - true if the id is already used
  */
  this.isIdValidWord = async function(id) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM dictionnaire WHERE id = ?;';
      db.get(query, [id], (err, rows) => {
        if (err) reject(err);
        else if (rows.id == id) resolve(true);
      });
    });
  };

  /** test if an id is already used in suggestion table
   * @param {int} id - the id of the suggestion
   * @return {Promise<boolean>} - true if the id is already used
  */
  this.isIdValidSuggestion = async function(id) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM suggestion WHERE id = ?;';
      db.get(query, [id], (err, rows) => {
        if (err) reject(err);
        else if (rows.id == id) resolve(true);
      });
    });
  };

  /** modify a word of the dictionnaire table
   * @param {int} id - the id of the word
   * @param {{francais: string, pierrick: string, phonétique: string, classe: string, commentaire: string?, définition: string, étymologie: string, cyrilic: string?, hangeul: string?}} values - the values to modify
   * @return {Promise<int>} - 0 if success
  */
  this.editWord = async function(id, values) {
    return new Promise(async function(resolve, reject) {
      const query = 'UPDATE dictionnaire SET francais = ?, pierrick = ?, phonétique = ?, classe = ?, commentaire = ?, définition = ?, étymologie = ?, cyrilic = ?, hangeul = ? WHERE id = ?;';
      db.run(query, [values.francais, values.pierrick, values.phonétique, values.classe, values.commentaire, values.définition, values.étymologie, values.cyrilic, values.hangeul, id], (err) => {
        if (err) reject(err);
        else resolve(0);
      });
    });
  };

  /** modify a suggestion
   * @param {int} id - the id of the suggestion
   * @param {{francais: string, pierrick: string, phonetique: string, class: string, commentaire: string?, definition: string, etymologie: string, cyrilic: string?, hangeul: string?}} values - the values to modify
   * @return {Promise<int>} - 0 if success
   */
  this.editSuggest = async function(id, values) {
    return new Promise(async function(resolve, reject) {
      const query = 'UPDATE suggestion SET francais = ?, pierrick = ?, phonetique = ?, class = ?, commentaire = ?, definition = ?, etymologie = ?, cyrilic = ?, hangeul = ? WHERE id = ?;';
      db.run(query, [values.francais, values.pierrick, values.phonetique, values.class, values.commentaire, values.definition, values.etymologie, values.cyrilic, values.hangeul, id], (err) => {
        if (err) reject(err);
        else resolve(0);
      });
    });
  };

  /** get a word by its id
   * @param {int} id - the id of the word
   * @return {Promise<Object>} - the word
  */
  this.getWord = async function(id) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM dictionnaire WHERE id = ?;';
      db.get(query, [id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  /** search a word by like operator on francais column
   * @param {string} regex - the word to search
   * @param {int} offset - the offset of the search
   * @return {Promise<Object>} - the word
   */
  this.searchByFrenchRegex = async function(regex, offset) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM dictionnaire WHERE francais LIKE ? LIMIT 5 OFFSET ?;';
      db.all(query, [regex, offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  /** search a word by like operator on pierrrick column
   * @param {string} regex - the word to search
   * @param {int} offset - the offset of the search
   * @return {Promise<Object>} - the word
  */
  this.searchByPierrickRegex = async function(regex, offset) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT * FROM dictionnaire WHERE pierrick LIKE ? LIMIT 5 OFFSET ?;';
      db.all(query, [regex, offset], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  /** search a french word via the spellfix1 extension
   * @param {string} mot - the word to search
   * @return {Promise<Object>} - the list of words that matches
   */
  this.searchByFrenchSpellfix = async function(mot) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT word, dictionnaire.id, dictionnaire.définition FROM francais INNER JOIN dictionnaire ON francais.word == dictionnaire.francais WHERE francais.word MATCH ?;';
      const id = {}; // pour éviter les doublons
      const rows = [];
      db.each(query, [mot], (err, row) => {
        if (err) reject(err);
        else if (!(row.id in id)) {
          id[`${row.id}`] = 1;
          rows.push(row);
          resolve(rows);
        }
      }, (err, nb) => {
        if (err) reject(err);
        else if (nb == 0) resolve([]);
      });
    });
  };
  /** search a pierrick word via the spellfix1 extension
   * @param {string} mot - the word to search
   * @return {Promise<Object>} - the list of words that matches
   */
  this.searchByPierrickSpellfix = async function(mot) {
    return new Promise(async function(resolve, reject) {
      const query = 'SELECT word, dictionnaire.id, dictionnaire.définition FROM pierrick INNER JOIN dictionnaire ON pierrick.word == dictionnaire.pierrick WHERE pierrick.word MATCH ?;';
      const id = {}; // pour éviter les doublons
      const rows = [];
      db.each(query, [mot], (err, row) => {
        if (err) reject(err);
        else if (!(row.id in id)) {
          id[`${row.id}`] = 1;
          rows.push(row);
          resolve(rows);
        }
      }, (err, nb) => {
        if (err) reject(err);
        else if (nb == 0) resolve([]);
      });
    });
  };
};
const dao = new DaoLinguistique();
module.exports = dao;
