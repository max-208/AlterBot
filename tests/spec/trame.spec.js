const translitterate = require('data/translitterate.js');

describe('trame function', () => {
    it('should handle basic words', () => {
        expect(translitterate.trame('ʔɛllo woʁld')).toEqual([['c', 'v', 'c', 'c', 'v'], ['no_consonnant', 'jv', 'c', 'c', 'c']]);
    });

    it('should handle "jv" rule and nasal vowels', () => {
        expect(translitterate.trame('jaɛ̃')).toEqual([['no_consonnant', 'jv', 'v', 'n']]);
    });

    it('should handle complex words', () => {
        expect(translitterate.trame('wajti ðɔ̃ɡsʒ')).toEqual([['no_consonnant', 'jv', 'c', 'c', 'v'], ['c', 'v', 'n', 'c', 'c', 'c']]);
    });

     it('should handle words with whitespace', () => {
        expect(translitterate.trame('tʔis is a tɛst')).toEqual([['c', 'c', 'v', 'c'], ['no_consonnant', 'v', 'c'], ['no_consonnant', 'v'], ['c', 'v', 'c', 'c']]);
    });
});