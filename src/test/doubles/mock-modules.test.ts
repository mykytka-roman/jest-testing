import * as OtherUtils from "../../app/doubles/other-utils";

jest.mock('../../app/doubles/other-utils', () => ({
    ...jest.requireActual('../../app/doubles/other-utils'),
    calculateComplexity: () => {
        return 10
    }
}));

jest.mock('uuid', () => ({
    v4: () => 'roman-mykytka'
}))

describe('module tests', () => {


    test('calculate complexity', () => {
        const result = OtherUtils.calculateComplexity({} as any);
        expect(result).toBe(10);
    })

    test('keep other functions', () => {
        const result = OtherUtils.toUpperCase('abc');
        expect(result).toBe('ABC');
    })

    test('string with id', () => {
        const result = OtherUtils.toLowerCaseWithId('ABC');
        expect(result).toBe('abc roman-mykytka');
    })
})