import {v4} from "uuid";

export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
};

type LoggerServiceCallBack = (arg: string) => void;


export function calculateComplexity(stringInfo: Pick<StringInfo, 'extraInfo' | 'length'>) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
    return [arg.toLowerCase(), v4()].join(' ');
}

export function toUpperCaseWithCb(arg: string, callBack:LoggerServiceCallBack){
    if(!arg) {
        callBack('Invalid argument!');
        return;
    }
    callBack(`called function with ${arg}`)
    return arg.toUpperCase();
}

export class OtherStringUtils {

    public callExternalService() {
        console.log('Calling external service!!!');
    }

    public toUpperCase(arg: string) {
        return arg.toUpperCase()
    }

    public logString(arg: string) {
        console.log(arg);
    }
}