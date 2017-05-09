const HOST_PORT: any = process.env.HOST_PORT || 8090;

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val: string): any {
    const port: number = parseInt(val, 10);

    if (isNaN(port)) {
        //named pipe
        return val;
    }

    if (port >= 0) {
        //port number
        return port;
    }
    return false;
}

//get port from environment
export const port: number = normalizePort(HOST_PORT);
