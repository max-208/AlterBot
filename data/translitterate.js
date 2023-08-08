const alphabet = require('./alphabet.json');

class translitterate {
    constructor() {
        this.trame = (str) => {
            const voyelles = /[aeɛøioɔuy]/;
            const consonnes = /[bdfɡʔkjlmnn̪pʁɻsʃtwvzʒðθ]/;
            const nasale = /\u0303/;
            let trame = [];
            let list = str.split(" ")
            for (let text of list) {
                let word = []
                for (let i = 0; i < text.length; i++) {
                    const iterator = text[i];
                    if ((iterator == "j" || iterator == "w") && i < text.length - 1 && voyelles.test(text[i + 1])) {
                        if (nasale.test(text[i + 1])) {
                            word.push("jvn");
                        }
                        else {
                            word.push("jv");
                        }
                        text = text.slice(0, i + 1) + text.slice(i + 2);
                        
                    }
                    else {
                        word.push(iterator.replace(consonnes, "c").replace(voyelles, "v").replace(nasale, "n"));
                    }
                }
                trame.push(word);
            }
            return trame;
        };
        this.findNoConsonnant = (trame) => {
            for (let word of trame){
                for (let i = 0; i < word.length; i++) {
                    if (i != word.length - 1) {
                        if (word[i] == "v" && word[i + 1] == "v") {
                            word.splice(i + 1, 0, "no_consonnant");
                        }
                    }
                    
                }
            }
            return trame;
        }
        this.findNoVowels = (trame) => {
            for (let word of trame){
                let time_since_last_vowel = 0;
                for (let i = 0; i < word.length; i++) {
                    time_since_last_vowel += 1;
                    time_since_last_vowel = word[i] == "v" ? 0 : time_since_last_vowel;
                    if (i < word.length - 1) {
                        if (word[i] == "c" && word[i + 1] == "c") {
                            word = word.splice(i, 0, "no_consonnant");
                        }
                    }
                    
                }
            }
        }
        this.syllabes = (trame) => {
            let syllabes = [];
            for (const word of trame) {
                let syllabic_word = [];
                let last_consonnant = 0;
                for (let i = 0; i < word.length; i++) {
                    let syllabe = [];
                    let has_been_pushed = false;
                    if (word[i] == "v" && i == 0) {
                        syllabe.push("no_consonnant");
                        syllabe.push("v");
                        has_been_pushed = true;
                    }
                    if (word[i] == "v" && word[i + 1] == "v") {
                        if (!has_been_pushed) syllabe.push("v"); has_been_pushed = true;
                        syllabe.push("no_consonnant")
                        syllabic_word.push(syllabe);
                        syllabe = [];
                    }
                    else if (word[i] == "v" && syllabe.length !=0 && word[i + 1] == "c") {
                        syllabe.push("v");
                    }
                    if (word[i] == "c" && word[i + 1] == "c" && syllabe.length !=0 ){
                        syllabe.push('c');
                        last_consonnant += 1;
                        if (last_consonnant == 3) {
                            syllabic_word.push(syllabe);
                            syllabe = [];
                            last_consonnant = 0;
                        }
                    }
                    if (word[i] == "c" && word[i + 1] == "c" && syllabe.length == 0) {
                        syllabe.push('c');
                        syllabe.push('no_vowel');
                    }
                    }
                    syllabes.push(syllabic_word);
                }
                return syllabes;
        };
        this.lat_to_kor = (text) => {
            let result = "";
            let trame = this.trame(text);
            let j = 0;
            for (let word of trame){
                for (let i = 0; i < trame.length; i++) {

                    j++
                }
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