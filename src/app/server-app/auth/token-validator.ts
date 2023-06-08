

export type TokenValidator = {

    validateToken(tokenId: string): Promise<boolean>

}