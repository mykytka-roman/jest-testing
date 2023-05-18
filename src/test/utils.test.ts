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
    })

    it.only('should return info about valid string', () => {
        const sut = getStringInfo;

        const actual = sut('My string');

        expect(actual.lowerCase).toBe('my string');
        expect(actual.info).toEqual({});

        expect(actual.characters.length).toBe(9);
        expect(actual.characters).toHaveLength(9);
        expect(actual.characters).toEqual(['M', 'y', ' ', 's', 't', 'r', 'i', 'n', 'g']);
        expect(actual.characters).toContain<string>('M');
        expect(actual.characters).toEqual<string>(
            expect.arrayContaining(['s', 't', 'r', 'i','M', 'y', ' ','n', 'g'])
        );

        expect(actual.info).not.toBe(undefined);
        expect(actual.info).not.toBeUndefined();
        expect(actual.info).toBeDefined();
        expect(actual.info).toBeTruthy();

    })

})