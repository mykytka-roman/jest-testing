import {toUpperCase} from "../app/utils";

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
})