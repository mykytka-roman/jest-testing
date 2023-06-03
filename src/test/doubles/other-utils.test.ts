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

    describe.only('Tracking callbacks with Jest mocks', ()=>{

        const callBackMock = jest.fn();

        afterEach(()=>{
            // reset jest mocks
            jest.clearAllMocks();
        })

        it('calls callback for invalid argument - track calls', ()=>{
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined();
            expect(callBackMock).toBeCalledWith('Invalid argument!')
            expect(callBackMock).toBeCalledTimes(1);
        })

        it('calls callback for valid argument - track calls', ()=>{
            const actual = toUpperCaseWithCb('abc', callBackMock);
            expect(actual).toBe('ABC')
            expect(callBackMock).toBeCalledWith('called function with abc')
            expect(callBackMock).toBeCalledTimes(1);
        })
    });

    describe('Tracking callbacks', ()=>{

        let cbArgs = [];
        let timesCalled = 0;

        function callBackMock(arg:string) {
            cbArgs.push(arg);
            timesCalled++;
        }

        afterEach(()=>{
            // reset tracking fields:
            cbArgs = [];
            timesCalled = 0;
        });

        it('calls callback for invalid argument - track calls', ()=>{
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined();
            expect(cbArgs).toContain('Invalid argument!');
            expect(timesCalled).toBe(1);
        });

        it('calls callback for valid argument - track calls', ()=>{
            const actual = toUpperCaseWithCb('abc', callBackMock);
            expect(actual).toBe('ABC')
            expect(cbArgs).toContain('called function with abc');
            expect(timesCalled).toBe(1);
        });
    });

})