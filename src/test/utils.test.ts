import {toUpperCase, getStringInfo} from "../app/utils";

describe('Utils tests', () => {
    it('should return uppercase of valid test', () => {
        // arrange
        const sut = toUpperCase;
        const expected = 'ABC';

        // act
        const actual = sut('abc');

        // assert
        expect(actual).toBe(expected)
    });

    describe('Parametrized tests | ToUpperCase examples', ()=>{
        it.each([
            {input:'xyz', expected: 'XYZ'},
            {input:'My String', expected: 'MY STRING'},
            {input:'roman', expected: 'ROMAN'}
        ])('$input toUpperCase should be $expected', ({input, expected})=>{
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
    })

    describe('getStringInfo for arg My String should', () => {
        test('return right upper case', () => {
            const actual = getStringInfo('My String');
            expect(actual.upperCase).toBe('MY STRING');
        });
        test('return right lower case', () => {
            const actual = getStringInfo('My String');
            expect(actual.lowerCase).toBe('my string');
        });
        test('return right length', () => {
            const actual = getStringInfo('My String');
            expect(actual.characters.length).toBe(9);
            expect(actual.characters).toHaveLength(9);
        });


        test('return right characters', ()=>{
            const actual = getStringInfo('My String');
            expect(actual.characters).toEqual(['M', 'y', ' ','S', 't', 'r','i', 'n', 'g']);
            expect(actual.characters).toContain<string>('M');
            expect(actual.characters).toEqual(
                expect.arrayContaining(['S', 't', 'r','i', 'n', 'g', 'M', 'y', ' '])
            );
        });
        test('return defined extra info', ()=>{
            const actual = getStringInfo('My String');
            expect(actual.info).not.toBe(undefined);
            expect(actual.info).not.toBeUndefined();
            expect(actual.info).toBeDefined();
            expect(actual.info).toBeTruthy();
        });

        test('return right extra info', ()=>{
            const actual = getStringInfo('My String');
            expect(actual.info).toEqual({})
        });
    });
})