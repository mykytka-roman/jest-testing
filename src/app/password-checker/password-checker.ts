export class PasswordChecker {

    public checkPassword(pass: string): boolean {
        if (pass.length < 8) {
            return false;
        }
        if(pass === pass.toLowerCase()) {
            return false;
        }
        if(pass === pass.toUpperCase()) {
            return false;
        }
        return true;
        // return pass.length >= 8;
    }
}