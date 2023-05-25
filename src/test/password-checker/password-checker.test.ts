import { PasswordChecker } from "../../app/password-checker/password-checker"


describe('PasswordChecker test suite', ()=>{

    let sut: PasswordChecker;

    beforeEach(()=>{
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', ()=>{
       const actual =  sut.checkPassword('0123456');
       expect(actual).toBe(false);
    })

    it('Password must contain at least 8 characters', () => {
        const actual = sut.checkPassword('01234567Ab');
        expect(actual).toBe(true);
    });

    it('A password without an uppercase letter is invalid', () => {
        const actual = sut.checkPassword('01234abc');
        expect(actual).toBe(false);
    });

    it('A password which contains at least one uppercase letter is valid', () => {
        const actual = sut.checkPassword('01234abcD');
        expect(actual).toBe(true);
    });

    it('A password without an lowercase letter is invalid', () => {
        const actual = sut.checkPassword('01234ABC');
        expect(actual).toBe(false);
    });

    it('A password which contains at least one lowercase letter is valid', () => {
        const actual = sut.checkPassword('01234ABCd');
        expect(actual).toBe(true);
    });


})