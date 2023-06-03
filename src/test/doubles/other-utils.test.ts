import {calculateComplexity, toUpperCaseWithCb} from "../../app/doubles/other-utils";

describe('OtherUtils test suite', ()=>{

    it('Calculates complexity', ()=>{
        const someInfo  = {
            length: 5,
            extraInfo: {
                field1: 'someInfo',
                field2: 'someOtherInfo'
            }
        }

        const actual = calculateComplexity(someInfo);
        expect(actual).toBe(10);
    });

    it('ToUpperCase - calls callback for invalid argument', ()=>{
        const actual = toUpperCaseWithCb('', ()=>{});
        expect(actual).toBeUndefined();
    });

    it('ToUpperCase - calls callback for valid argument', ()=>{
        const actual = toUpperCaseWithCb('abc', ()=>{});
        expect(actual).toBe('ABC');
    });
})