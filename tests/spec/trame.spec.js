const translitterate = require('data/translitterate.js');

describe('trame function', () => {
    it('should handle basic words', () => {
        expect(translitterate.trame('ʔɛllo woʁld')).toEqual([['c', 'v', 'c', 'c', 'v'], ['jv', 'c', 'c', 'c']]);
    });

    it('should handle "jv" rule and nasal vowels', () => {
        expect(translitterate.trame('jaɛ̃')).toEqual([['jv', 'v', 'n']]);
    });

    it('should handle complex words', () => {
        expect(translitterate.trame('wajti ðɔ̃ɡsʒ')).toEqual([['jv', 'c', 'c', 'v'], ['c', 'v', 'n', 'c', 'c', 'c']]);
    });

     it('should handle words with whitespace', () => {
        expect(translitterate.trame('tʔis is a tɛst')).toEqual([['c', 'c', 'v', 'c'], ['v', 'c'], ['v'], ['c', 'v', 'c', 'c']]);
    });
});
   /* console.log(korean.syllabes(['c', 'v', 'c', 'v', 'c']))
describe('syllabes function', () => {
    it('should handle simple syllabes', () => {
        expect(korean.syllabes(['c', 'v', 'c', 'v', 'c'])).toEqual([[['c', 'v'], ['c', 'v', 'c']]]);
    });

});*/