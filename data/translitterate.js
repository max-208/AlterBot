const alphabet = require('./alphabet.json');
const correspondance = require('./phonetique.json');

class translitterate {
    constructor() {
        this.phonetize = (str) => {
            let phonetique = "/";
            phonetique += this.rawPhonetize(str);
            phonetique += "/";
            return phonetique;
        }
        this.rawPhonetize = (str) => {
            //for each char replace the API equivalent
            let phonetique = "";
            for (const iterator of str) {
                phonetique += correspondance[iterator];
            }
            return phonetique;
        }
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
                        word.push("jv");
                        text = text.slice(0, i + 1) + text.slice(i + 2);
                    }
                    else {
                        word.push(iterator.replace(consonnes, "c").replace(voyelles, "v").replace(nasale, "n"));
                    }
                }
                trame.push(word);
            }
            return this.findNoConsonnant(trame);
        };
        this.findNoConsonnant = (trame) => {
            for (let word of trame){
                for (let i = 0; i < word.length; i++) {
                    if (i != word.length - 1) {
                        if (word[i] == "v" || word[i] == "jv") {
                            if (word[i + 1] == "v" || word[i + 1] == "jv") { //must be first bc if the other if add a no_consonnant, index changes
                                word.splice(i + 1, 0, "no_consonnant");
                            }
                            if (i == 0) {
                                word.splice(0, 0, "no_consonnant");
                            }
                        }
                    }
                    else if((word[i] == "v" || word[i] == "jv") && i == 0) { //if the word is only one letter
                        word.splice(0, 0, "no_consonnant");
                    }
                }
            }
            return trame;
        }
        /*
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
        }*/
        this.syllabes = (trame) => {
            let syllabes = [];
            for (const word of trame) {
                let syllabic_word = [];
                let last_consonnant = 0;
                let syllabe = [];
                for (let i = 0; i < word.length; i++) {
                    if ( i != word.length - 1) {
                        if (word[i] == "v" || word[i] == "jv") {
                            if (i == 0) {
                                console.log("notice: vowel first when translating to korean pierrick")
                            }
                            if (word[i + 1] == "v" || word[i + 1] == "jv") {
                                console.log("notice: two consecutive vowels when translating to korean pierrick")
                            }
                            if (syllabe.length !=0 && (word[i + 1] == "c" || word[i + 1] == "n" )) {
                                syllabe.push(word[i]);
                            }
                        }
                    
                        if (word[i] == "c" || word[i] == "n" || word[i] == "no_consonnant") {
                            if (word[i + 1] == "c"){
                                if (syllabe.length != 0) {
                                    syllabe.push(word[i]);
                                    last_consonnant += 1;
                                    if (last_consonnant == 2) {
                                        syllabic_word.push(syllabe);
                                        syllabe = [];
                                        last_consonnant = 0;
                                    }
                                }
                                else if (syllabe.length == 0) {
                                    syllabe.push('c');
                                    syllabe.push('no_vowel');
                                }
                            }
                            if (word[i + 1] == "v" || word[i + 1] == "jv") {
                                if (syllabe.length != 0) {
                                    syllabic_word.push(syllabe);
                                    syllabe = [];
                                    last_consonnant = 0;
                                }
                                syllabe.push(word[i]);
                            }

                        }
                    }
                    else {
                    syllabe.push(word[i]);
                    syllabic_word.push(syllabe);
                    syllabe = [];
                    }
                    }
                    syllabes.push(syllabic_word);
                }
                return syllabes;
        };
        //TODO: add the function that will translate the syllabes to korean
        this.lat_to_kor = (text) => {
            let result = ""
            let syllabes = this.syllabes(this.trame(this.rawPhonetize(text)));
            let j = 0;
            for (const word of syllabes) {
                for (const syllabe of word) {
                    for (let i = 0; i < syllabe.length; i++){
                        if (i == 0) {
                            if (syllabe[i] == "no_consonnant") result += alphabet.korean[2].debut["no_consonnant"];
                            else result += alphabet.korean[2].debut[text[j]];
                            j++;
                        }
                        else if (i == 1){
                            switch(syllabe[i]){
                                case "no_vowel":
                                    result += alphabet.korean[2].voyelles["no_vowel"];
                                    break;
                                case "v":
                                    result += alphabet.korean[2].voyelles[text[j]];
                                    break;
                                case "jv":
                                    result += alphabet.korean[2].voyelles[text[j] + text[j + 1]];
                                    j++; //beacause the jv is two letters in latin pierrick but only one in korean
                                    break;
                                default:
                                    console.log("error: no vowel in syllabe");
                                    break;
                            }
                            j++
                        }
                        else{
                            switch(syllabe[i]){
                                case "c":
                                    result += alphabet.korean[2].fin[text[j]];
                                    break;
                                case "n":
                                    result += alphabet.korean[2].voyelles["nasalized"];
                                    break;
                                default:
                                    console.log("error: undefined thing in end consonnant : " + syllabe[i] + " corresponding to char : " + word[j] + " in word : " + word + " in text : " + text);
                                    break;
                            }
                            j++
                        }
                    }
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