import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../auth/authorizer";
import { Account } from "../model/auth-model";
import { HTTP_CODES, HTTP_METHODS } from "../model/server-model";
import { getRequestBody } from "../utils/utils";




export class LoginHandler {

    private request: IncomingMessage;
    private response: ServerResponse;
    private authorizer: Authorizer;

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

    private async handlePost(){
        const requestBody: Account = await getRequestBody(this.request);
        if(requestBody.userName && requestBody.password) {
            const token = await this.authorizer.login(
                requestBody.userName,
                requestBody.password
            )
            if (token) {
                this.response.statusCode = HTTP_CODES.CREATED;
                this.response.writeHead(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
                this.response.write(JSON.stringify({token}));
            } else {
                this.response.statusCode = HTTP_CODES.NOT_fOUND;
                this.response.write(JSON.stringify('wrong username or password'));
            }
            return;
        }
        this.response.statusCode = HTTP_CODES.BAD_REQUEST;
        this.response.writeHead(HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' });
        this.response.write(JSON.stringify('userName and password required'));
    }

}