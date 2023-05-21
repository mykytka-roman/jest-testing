export type StringInfo = {
    lowerCase: string;
    upperCase: string;
    characters: string[];
    length: number;
    info?: object;
}

export class StringUtils {
    public  toUpperCase = (args: string): string => args.toUpperCase();
}

export const toUpperCase = (args: string): string => args.toUpperCase();


export const getStringInfo = (args: string): StringInfo => ({
    upperCase: args.toUpperCase(),
    lowerCase: args.toLowerCase(),
    length: args.length,
    characters: Array.from(args),
    info: {}
});