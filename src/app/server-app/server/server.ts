import { createServer, IncomingMessage, Server as NodeServer, ServerResponse } from 'http'
import { Authorizer } from '../auth/authorizer';
import { ReservationsDataAccess } from '../data/reservations-data-access';
import { LoginHandler } from '../handlers/login-handler';
import { RegisterHandler } from '../handlers/register-handler';
import { ReservationsHandler } from '../handlers/reservations-handler';
import { HTTP_CODES } from '../model/server-model';

export class Server {

    private server: NodeServer;
    private authorizer = new Authorizer();
    private reservationsDataAccess = new ReservationsDataAccess();

    public async startServer() {
        this.server = createServer(async (req, res) => {
            console.log(`Got request from ${req.headers['user-agent']}`);
            console.log(`Got request for ${req.url}`);
            await this.handleRequest(req, res);
            res.end();
        });
        this.server.listen(8080);
        console.log('server started on 8080')
    }

    private async handleRequest(request: IncomingMessage, response: ServerResponse) {
        console.log(request);
        try {
            const route = this.getRouteFromUrl(request);
            switch (route) {
                case 'register':
                    await new RegisterHandler(request, response, this.authorizer).handleRequest();
                    break;
                case 'login':
                    await new LoginHandler(request, response, this.authorizer).handleRequest();
                    break;
                case 'reservation':
                    const reservation = new ReservationsHandler(request, response, this.authorizer, this.reservationsDataAccess)
                    await reservation.handleRequest();
                    break;
                default:
                    break;
            }
        } catch (error) {
            response.writeHead(HTTP_CODES.INTERNAL_SERVER_ERROR, JSON.stringify(`Internal server error: ${error.message}`))
            console.log(error);
        }
    }

    private getRouteFromUrl(request: IncomingMessage) {
        const fullRoute = request.url;
        if (fullRoute) {
            return fullRoute.split('/')[1];
        }
    }

    public async stopServer() {
        if (this.server) {
            this.server.close();
            console.log('server closed')
        }
    }
}