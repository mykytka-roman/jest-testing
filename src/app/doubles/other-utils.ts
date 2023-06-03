export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

export function calculateComplexity(stringInfo: Pick<StringInfo, 'extraInfo' | 'length'>) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}