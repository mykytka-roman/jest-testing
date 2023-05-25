export enum PasswordErrors {
    SHORT = 'Password is too short!',
    NO_UPPER_CASE = 'Upper case letter required!',
    NO_LOWER_CASE = 'Lower case letter required!'
}


export interface CheckResult {
    valid: boolean,
    reasons: PasswordErrors[]
}



export class PasswordChecker {

    public checkPassword(pass: string): CheckResult {
        const reasons: PasswordErrors[] = [];

        if (pass.length < 8) {
            reasons.push(PasswordErrors.SHORT);
        }
        if(pass === pass.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPER_CASE);
        }
        if(pass === pass.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWER_CASE);
        }
        const valid = !reasons.length;

        return {
            valid,
            reasons
        };
    }
}