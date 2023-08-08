const translitterate = require('data/translitterate.js');

describe('findNoConsonnant function', () => {
    it('should prevent word from beginning with a vowel', () => {
        const input = [['v', 'c', 'c']];
        const expectedOutput = [['no_consonnant', 'v', 'c', 'c']];
        expect(translitterate.findNoConsonnant(input)).toEqual(expectedOutput); 
    });
    it('should separate two vowels', () => {
        expect(translitterate.findNoConsonnant([['v', 'v']])).toEqual([['no_consonnant', 'v', 'no_consonnant', 'v']]);
    });

    it('should not separate two consonnants', () => {
        expect(translitterate.findNoConsonnant([['c', 'c']])).toEqual([['c', 'c']]);
    });

    it('should not separate a consonnant and a vowel', () => {
        expect(translitterate.findNoConsonnant([['c', 'v']])).toEqual([['c', 'v']]);
    });

    it('should not separate a vowel and a consonnant', () => {
        expect(translitterate.findNoConsonnant([['v', 'c']])).toEqual([['no_consonnant', 'v', 'c']]);
    });

    it('should separate vowels multiple times', () => {
        expect(translitterate.findNoConsonnant([['v', 'v', 'v']])).toEqual([['no_consonnant', 'v', 'no_consonnant', 'v', 'no_consonnant', 'v']]);
    });

    it('should add "no_consonnant" between consecutive "v" in each word', () => {
        const input = [['v', 'v', 'c', 'v', 'v'], ['c', 'v', 'c', 'v', 'v', 'v', 'c']];
        const expectedOutput = [['no_consonnant', 'v', 'no_consonnant', 'v', 'c', 'v', 'no_consonnant', 'v'], ['c', 'v', 'c', 'v', 'no_consonnant', 'v', 'no_consonnant', 'v', 'c']];
        expect(translitterate.findNoConsonnant(input)).toEqual(expectedOutput);
    });
    
    it('should not add "no_consonnant" when no consecutive "v" are present', () => {
        const input = [['v', 'c', 'v'], ['v', 'c', 'c', 'v']];
        const expectedOutput = [['no_consonnant', 'v', 'c', 'v'], ['no_consonnant', 'v', 'c', 'c', 'v']];
        expect(translitterate.findNoConsonnant(input)).toEqual(expectedOutput);
    });

    it('should handle empty words', () => {
        const input = [[]];
        const expectedOutput = [[]];
        expect(translitterate.findNoConsonnant(input)).toEqual(expectedOutput);
    });
});