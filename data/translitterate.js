const alphabet = require('./alphabet.json');

class translitterate {
    constructor() {
        this.trame = (text) => {
            const voyelles = /[aeéëioòuü]/;
            const consonnes = /[bdfghkjlmnprřsštwvyzžðþ]/;
            const nasale = /[āōū]/;
            let trame = [];
            for (let i = 0; i < text.length; i++) {
                const iterator = text[i];
                if ((iterator == "j" || iterator == "w") && i < text.length - 1 && voyelles.test(text[i + 1])) {
                    trame.push("jv");
                    text = text.slice(0, i + 1) + text.slice(i + 2);
                }
                else {
                    trame.push(iterator.replace(consonnes, "c").replace(voyelles, "v").replace(nasale, "vn"));
                }
            }
            return trame;
        };
        this.lat_to_kor = (text) => {
            let result = "";
            let trame = this.trame(text);
            for (let i = 0; i < trame.length; i++) {

            }
        }
        this.lat_to_georg = (text) => {
            let result = "";
            text = text.toLowerCase();
            text = text.replace(/ts/, data.alphabet.georgian[0].ts).replace(/dz/, data.alphabet.georgian[0].dz).replace(/tš/, data.alphabet.georgian[0].tš).replace(/dž/, data.alphabet.georgian[0].dž);
            for (const iterator of text) {
                if (data.alphabet.georgian[0][iterator] != undefined) {
                    result += data.alphabet.georgian[0][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result
        }
        this.lat_to_cyr = (text) => {
            text = text.replace(/ts/, data.alphabet.cyrilic[0].ts).replace(/dz/, data.alphabet.cyrilic[0].dz).replace(/tš/, data.alphabet.cyrilic[0].tš).replace(/dž/, data.alphabet.cyrilic[0].dž);
            for (const iterator of text) {
                if (data.alphabet.cyrilic[0][iterator.toLowerCase()] != undefined) {
                    if (iterator.toUpperCase() == iterator) {
                        const inter = data.alphabet.cyrilic[0][iterator.toLowerCase()];
                        result += inter.toUpperCase();
                    }
                    else result += data.alphabet.cyrilic[0][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result;
        }
        this.georg_to_lat = (text) => {
            text = text.replace(/\u10d3\u10ff/, 'ð').replace(/\u10e2\u10ff/, 'þ').replace(/\u10d0\u10fc/, 'ā').replace(/\u10dd\u10fc/, 'ō').replace(/\u10e3\u10fc/, 'ū');
            for (const iterator of text) {
                if (data.alphabet.georgian[1][iterator] != undefined){
                    result += data.alphabet.georgian[1][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result;
        }
        this.cyr_to_lat = (text) => {
            for (const iterator of text){
                if (data.alphabet.cyrilic[1][iterator.toLowerCase()] != undefined) {
                    if (iterator.toUpperCase() == iterator) {
                        const inter = data.alphabet.cyrilic[1][iterator.toLowerCase()];
                        result += inter.toUpperCase();
                    }
                    else result += data.alphabet.cyrilic[1][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result;
        }
        this.kor_to_lat = (text) => {
            for (const iterator of text){
                if (data.alphabet.korean[1][iterator] != undefined) {
                    result += data.alphabet.korean[0][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result;
        }
    }
}

module.exports = new translitterate();