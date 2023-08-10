const translitterate = require('data/translitterate.js');

const consonnes = "bdfghklmnprřsštvzž";
const base = "dé";
for (const consonne of consonnes){
    for(const consonne2 of consonnes){
        console.log(`${consonne}${consonne2} => ${translitterate.lat_to_kor(base + consonne + consonne2)}`)
    }

}