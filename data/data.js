const linguistiqueConnection = require('./sqlite_connection_linguistique');
const linguistiqueDao = require('./dao_linguistique');
// dictionnaire associant le pierrick latin au pierrick georgien / cyrilique
const alphabet = require('./alphabet.json');
// dictionnaire (json) associant lettres pierrick et alphabet phonétique international
const correspondance = require('./phonetique.json');

const translitterate = require('./translitterate.js'); // translation logic

module.exports = {
  linguistique_connection: linguistiqueConnection,
  db: linguistiqueDao,
  correspondance: correspondance,
  alphabet: alphabet,
  awing_id: '1004518765834289302',
  translitterate: translitterate,
};
