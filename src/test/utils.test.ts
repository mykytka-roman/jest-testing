import {toUpperCase, getStringInfo, StringUtils} from "../app/utils";

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

    describe('StringUtils class tests', () => {
        let sut: StringUtils;

        beforeEach(() => {
            sut = new StringUtils();
            console.log('Setup');
        });

        afterEach(() => {
            // clearing mocks
            console.log('Teardown');
        });

        const expected = 'ABC';

        it('1. Should return correct upperCase', () => {
            const actual = sut.toUpperCase('abc');

            expect(actual).toBe(expected);
            console.log('Actual test')
        });

        it('2. Should throw error on invalid arg - function', () => {
            function expectError() {
                const actual = sut.toUpperCase('');
            }

            expect(expectError).toThrow('Invalid argument XXX');
            expect(expectError).toThrowError('Invalid argument YYY');
        });

        it('3. Should throw error on invalid arg - arrow function', () => {
            const arrowFnExpectError = () => {
                sut.toUpperCase('');
            };

            expect(arrowFnExpectError).toThrow('Invalid argument YYY');
            expect(arrowFnExpectError).toThrowError(Error('Invalid argument XXX'));
        });

        it('4. Should throw error on invalid arg - anonymous arrow function', () => {
            const expected = 'Invalid argument';
            expect(() => sut.toUpperCase('')).toThrow(expected);
            expect(() => sut.toUpperCase('')).toThrowError(Error(expected));
        });

        it('5. Should throw error on invalid arg - try catch', (done) => {

            try {
                sut.toUpperCase('');
                done('should throw error');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message', 'Invalid argument YYY');
                done();
            }
        });

        it.todo('Test long string')

    })

    describe('Parametrized tests | ToUpperCase examples', () => {
        it.each([
            {input: 'xyz', expected: 'XYZ'},
            {input: 'My String', expected: 'MY STRING'},
            {input: 'roman', expected: 'ROMAN'}
        ])('$input toUpperCase should be $expected', ({input, expected}) => {
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


        test('return right characters', () => {
            const actual = getStringInfo('My String');
            expect(actual.characters).toEqual(['M', 'y', ' ', 'S', 't', 'r', 'i', 'n', 'g']);
            expect(actual.characters).toContain<string>('M');
            expect(actual.characters).toEqual(
                expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', ' '])
            );
        });
        test('return defined extra info', () => {
            const actual = getStringInfo('My String');
            expect(actual.info).not.toBe(undefined);
            expect(actual.info).not.toBeUndefined();
            expect(actual.info).toBeDefined();
            expect(actual.info).toBeTruthy();
        });

        test('return right extra info', () => {
            const actual = getStringInfo('My String');
            expect(actual.info).toEqual({})
        });
    });

})