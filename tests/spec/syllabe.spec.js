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
    it('should handle multiple word of one syllabe', () => {
        const input = [["c", "v", "c", "c"], ["c", "v", "c", "c"]];
        const expectedOutput = [[["c", "v", "c", "c"]], [["c", "v", "c", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle multiple word of multiple syllabes', () => {
        const input = [["c", "v", "c", "c", "c", "v", "c", "c"], ["c", "v", "c", "c", "c", "v", "c", "c"]];
        const expectedOutput = [[["c", "v", "c", "c"], ["c", "v", "c", "c"]], [["c", "v", "c", "c"], ["c", "v", "c", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle wet vowel', () => {
        const input = [["c", "jv", "c", "c"]];
        const expectedOutput = [[["c", "jv", "c", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle nasal vowel', () => {
        const input = [["c", "v", "n", "c"]];
        const expectedOutput = [[["c", "v", "n", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle wet nasal vowel', () => {
        const input = [["c", "jv", "n", "c"]];
        const expectedOutput = [[["c", "jv", "n", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle complex word', () => {
        const input = [["c", "jv", "c", "c", "v", "n", "c", "c", "jv", "n", "c", "c","c"]];
        const expectedOutput = [[["c", "jv", "c"], ["c", "v", "n", "c"], ["c", "jv", "n", "c"], ["c", "no_vowel", "c"]]];
        expect(translitterate.syllabes(input)).toEqual(expectedOutput);
    });
    it('should handle multiple complex word', () => {
        const input = [["c", "jv", "c", "c", "v", "n", "c", "c", "jv", "n", "c", "c","c"], ["c", "jv", "c", "c", "v", "n", "c", "c", "jv", "n", "c", "c","c"]]
        const expectedOutput = [[["c", "jv", "c"], ["c", "v", "n", "c"], ["c", "jv", "n", "c"], ["c", "no_vowel", "c"]], [["c", "jv", "c"], ["c", "v", "n", "c"], ["c", "jv", "n", "c"], ["c", "no_vowel", "c"]]];
    });
});