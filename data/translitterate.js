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
            str = str.toLowerCase();
            let phonetique = "";
            for (const iterator of str) {
                phonetique += correspondance[iterator];
            }
            return phonetique;
        }
        this.trame = (str) => {
            const voyelles = /[aeɛøioɔuy]/;
            const consonnes = /[bdfɡʔkjlmnpʁɻsʃtwvzʒðθ]/;
            const nasale = /\u0303/;
            const pontet = /\u032A/;

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
                    else if (!pontet.test(iterator)) {
                        word.push(iterator.replace(consonnes, "c").replace(voyelles, "v").replace(nasale, "n"));
                    }
                }
                trame.push(word);
            }
            return this.findNoConsonnant(trame);
        };
        this.findNoConsonnant = (trame) => {
            for (let word of trame) {
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
                    else if ((word[i] == "v" || word[i] == "jv") && i == 0) { //if the word is only one letter
                        word.splice(0, 0, "no_consonnant");
                    }
                }
            }
            return trame;
        }
        this.syllabes = (trame) => {
            let syllabes = [];
            for (const word of trame) {
                let syllabic_word = [];
                let last_consonnant = 0;
                let syllabe = [];
                for (let i = 0; i < word.length; i++) {
                    if (i != word.length - 1) {
                        if (word[i] == "v" || word[i] == "jv") { //if the letter is a vowel (wet vowel are not useful for this function)
                            if (i == 0) { //due to the way the trame is made, the first letter should not be a vowel
                                console.log("notice: vowel first when translating to korean pierrick")
                            }
                            if (word[i + 1] == "v" || word[i + 1] == "jv") { //due to the way the trame is made, two consecutive vowels should not be possible
                                console.log("notice: two consecutive vowels when translating to korean pierrick")
                            }
                            if (syllabe.length != 0 && (word[i + 1] == "c" || word[i + 1] == "n" || word[i+1] == "no_consonnant")) { //if the next letter is a consonnant, the vowel is pushed into the syllabe
                                syllabe.push(word[i]);
                            }
                        }
                        else if (word[i] == "c" || word[i] == "n" || word[i] == "no_consonnant") { //if the letter is a consonnant ("no_consonnant" is a consonnant that is not pronounced, and "nasal" take the place of a final consonnant)
                            if (word[i + 1] == "c") { //if the next letter is a consonnant
                                if (syllabe.length != 0) {//if the syllabe is not empty
                                    syllabe.push(word[i]);
                                    last_consonnant += 1;
                                    if (last_consonnant == 1) { //if there is two consecutive consonnant, the syllabe is pushed into the word to begin the next syllabe NB: in theory should be 2 but test has revealed that it works only for one
                                        syllabic_word.push(syllabe);
                                        syllabe = [];
                                        last_consonnant = 0;
                                    }
                                }
                                else if (syllabe.length == 0) { //a word can't begin with two consonnant, so the first consonnant is pushed into the syllabe and a fake vowel is added
                                    syllabe.push('c');
                                    syllabe.push('no_vowel');
                                }
                            }
                            if (word[i + 1] == "v" || word[i + 1] == "jv") { //if the next letter is a vowel
                                if (syllabe.length != 0) { //if the syllabe is not empty, it means that the previous consonnant was the final consonnant of the syllabe
                                    syllabic_word.push(syllabe);
                                    syllabe = [];
                                    last_consonnant = 0;
                                }
                                syllabe.push(word[i]);
                            }

                        }
                    }
                    else { //for the last letter of the word
                        if (word[i] == "c" && syllabe.length == 0){
                            syllabe.push(word[i]);
                            syllabe.push('no_vowel');
                        }
                        else syllabe.push(word[i]);
                        syllabic_word.push(syllabe);
                        syllabe = [];
                    }
                }
                syllabes.push(syllabic_word); //for each word, the syllabic word is pushed into the syllabes array
            }
            return syllabes;
        };
        this.lat_to_kor = (text) => {
            let result = ""
            let phonetized = this.rawPhonetize(text); //for some reason we need to use the phonetized text to translate
            phonetized = phonetized.replace(/\u032A/g, "") //remove the dental diacritic, not used in translation, and messes with the translation
            let syllabes = this.syllabes(this.trame(phonetized));
            phonetized = phonetized.replace(/ /g, "") //remove the spaces from the phonetized text (will be added later)
            let j = 0; //index to iterate through the phonetized text
            for (const word of syllabes) {
                for (const syllabe of word) {
                    for (let i = 0; i < syllabe.length; i++) {
                        if (i == 0) {
                            if (syllabe[i] == "no_consonnant") { //if the syllabe begins with a no_consonnant, it is not on the phonetized text, so we add it manually
                                result += alphabet.korean[2].debut["no_consonnant"];
                                j--; //because the no_consonnant is not on the phonetized text, we need to go back one index
                            }
                            else result += alphabet.korean[2].debut[phonetized[j]]; //if the syllabe begins with a consonnant, we add it to the result
                            j++;
                        }
                        else if (i == 1) {
                            switch (syllabe[i]) {
                                case "no_vowel": //if the syllabe has no vowel, we add the no_vowel to the result
                                    result += alphabet.korean[2].voyelles["no_vowel"];
                                    if (j != phonetized.length -1) j--; //because the no_vowel is not on the phonetized text, we need to go back one index, if it's not the last letter
                                    break;
                                case "v":
                                    result += alphabet.korean[2].voyelles[phonetized[j]];
                                    break;
                                case "jv":
                                    result += alphabet.korean[2].voyelles[phonetized[j] + phonetized[j + 1]];
                                    j++; //beacause the jv is two letters in latin pierrick but only one in korean
                                    break;
                                default:
                                    console.log("error: no vowel in syllabe");
                                    break;
                            }
                            j++
                        }
                        else {
                            switch (syllabe[i]) {
                                case "c":
                                    result += alphabet.korean[2].fin[phonetized[j]]; //if the syllabe has a consonnant, we add it to the result
                                    break;
                                case "n":
                                    result += alphabet.korean[2].voyelles["nasalized"]; //if the syllabe has a nasal, we add the nasalization character to the result
                                    break;
                                default:
                                    console.log("error: undefined thing in end consonnant : " + syllabe[i] + " corresponding to char : " + word[j] + " in word : " + word + " in text : " + text);
                                    break;
                            }
                            j++
                        }
                    }
                }
                result += " "; //add a space between each word
            }
            return result;
        }
        this.lat_to_georg = (text) => {
            let result = "";
            text = text.toLowerCase();
            text = text.replace(/ts/, alphabet.georgian[0].ts).replace(/dz/, alphabet.georgian[0].dz).replace(/tš/, alphabet.georgian[0].tš).replace(/dž/, alphabet.georgian[0].dž);
            for (const iterator of text) {
                if (alphabet.georgian[0][iterator] != undefined) {
                    result += alphabet.georgian[0][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result
        }
        this.lat_to_cyr = (text) => {
            text = text.replace(/ts/, alphabet.cyrilic[0].ts).replace(/dz/, alphabet.cyrilic[0].dz).replace(/tš/, alphabet.cyrilic[0].tš).replace(/dž/, alphabet.cyrilic[0].dž);
            for (const iterator of text) {
                if (alphabet.cyrilic[0][iterator.toLowerCase()] != undefined) {
                    if (iterator.toUpperCase() == iterator) {
                        const inter = alphabet.cyrilic[0][iterator.toLowerCase()];
                        result += inter.toUpperCase();
                    }
                    else result += alphabet.cyrilic[0][iterator];
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
                if (alphabet.georgian[1][iterator] != undefined) {
                    result += alphabet.georgian[1][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result;
        }
        this.cyr_to_lat = (text) => {
            for (const iterator of text) {
                if (alphabet.cyrilic[1][iterator.toLowerCase()] != undefined) {
                    if (iterator.toUpperCase() == iterator) {
                        const inter = alphabet.cyrilic[1][iterator.toLowerCase()];
                        result += inter.toUpperCase();
                    }
                    else result += alphabet.cyrilic[1][iterator];
                }
                else {
                    result += iterator;
                }
            }
            return result;
        }
        this.kor_to_lat = (text) => {
            let result = "";
            result = result.replace(/\u1173|\u110b/g, "");
            for (const iterator of text) {
                if (alphabet.korean[1][iterator] != undefined) {
                    result += alphabet.korean[1][iterator];
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