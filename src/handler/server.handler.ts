import * as debug from 'debug';

import {server, ServerAddressObject} from '../app.server';
import {port} from '../configs/port.config';

debug('paqup:server');

/**
 * Event listener for HTTP server 'listening' event.
 */
export function onServerListening (): void {
    const address: ServerAddressObject|string = server.getServerAddress();
    const bind: string = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    debug('Listening on ' + bind);
}

/**
 * Event listener for HTTP server 'error' event.
 */
export function onServerError (error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    //handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
