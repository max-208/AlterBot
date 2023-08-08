const translitterate = require('data/translitterate.js');

describe('syllabe function', () => {
    it('should handle simple syllabes', () => {
        const input = [["c", "v", "c", "c"]];
        const expectedOutput = [[["c", "v", "c", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle syllable without vowels', () => {
        const input = [["c", "c", "c"]];
        const expectedOutput = [[["c", "no_vowel" , "c", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle syllable without consonants', () => {
        const input = [["no_consonnant", "v"]];
        const expectedOutput = [[["no_consonnant", "v"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle empty string', () => {
        const input = [[]];
        const expectedOutput = [[]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle multiple simple syllabes', () => {
        const input = [["c", "v", "c", "c", "c", "v", "c", "c"]];
        const expectedOutput = [[["c", "v", "c", "c"], ["c", "v", "c", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
});