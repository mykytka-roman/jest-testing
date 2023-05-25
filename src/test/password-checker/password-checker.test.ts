import {PasswordChecker, PasswordErrors} from "../../app/password-checker/password-checker"


describe('PasswordChecker test suite', ()=>{

    let sut: PasswordChecker;

    beforeEach(()=>{
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', ()=>{
       const actual =  sut.checkPassword('0123456');
       expect(actual.valid).toBe(false);
       expect(actual.reasons).toContain(PasswordErrors.SHORT);
    })

    it('Password must contain at least 8 characters', () => {
        const actual = sut.checkPassword('01234567');
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
    });

    it('A password without an uppercase letter is invalid', () => {
        const actual = sut.checkPassword('abcd');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    });

    it('A password which contains at least one uppercase letter is valid', () => {
        const actual = sut.checkPassword('abcD');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    });

    it('A password without an lowercase letter is invalid', () => {
        const actual = sut.checkPassword('ABCD');
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    });

    it('A password which contains at least one lowercase letter is valid', () => {
        const actual = sut.checkPassword('ABCDa');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
    });

    it('Complex password is valid', () => {
        const actual = sut.checkPassword('1234abcD');
        expect(actual.reasons).toHaveLength(0);
        expect(actual.valid).toBe(true);
    });

    it('Admin password with no number is invalid', () => {
        const actual = sut.checkAdminPassword('abcdABCD')
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER)
        expect(actual.valid).toBe(false);
    });

    it('Admin password with number is valid', () => {
        const actual = sut.checkAdminPassword('abcdABCD1')
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER)
    });

})