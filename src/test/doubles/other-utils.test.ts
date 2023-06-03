import {calculateComplexity} from "../../app/doubles/other-utils";

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
    })
})