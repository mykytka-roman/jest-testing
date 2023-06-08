import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../auth/authorizer";
import { Account } from "../model/auth-model";
import { HTTP_CODES, HTTP_METHODS } from "../model/server-model";
import { getRequestBody } from "../utils/utils";


export class RegisterHandler {

    private authorizer: Authorizer;
    private request: IncomingMessage
    private response: ServerResponse;

    public constructor(request: IncomingMessage, response: ServerResponse, authorizer: Authorizer) {
        this.request = request;
        this.response = response;
        this.authorizer = authorizer;
    }

    public async handleRequest() {
        switch (this.request.method) {
            case HTTP_METHODS.POST:
                await this.handlePost();
                break;
            default:
                break;
        }
    }


    private async handlePost() {
        const requestBody: Account = await getRequestBody(this.request);
        console.log(requestBody);
        if(requestBody.userName && requestBody.password) {
            const userId = await this.authorizer.registerUser(requestBody.userName, requestBody.password);
            this.response.statusCode = HTTP_CODES.CREATED;
            this.response.writeHead(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
            this.response.write(JSON.stringify({
                userId
            }));
            return;
        }
        this.response.statusCode = HTTP_CODES.BAD_REQUEST;
        this.response.writeHead(HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' });
        this.response.write(JSON.stringify('userName and password required'));

    }

}