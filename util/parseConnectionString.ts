export function parseConnectionString(connectionString) {
    // split connection string to key=value pairs
    const result = {};
    connectionString.split(';').forEach((x) => {
        const arr = x.split('=');
        if (arr[1]) {
            result[arr[0]] = arr[1];
        }
    });

    let server;
    let port;
    const dataSource = result['Server'];
    if (dataSource) {
        let match;
        const regex = /.*:(.*),([0-9]+)/;
        match = regex.exec(dataSource);
        if (match) {
            server = match[1];
            port = match[2];
        }
    }

    return {
        server,
        database: result['Initial Catalog'],
        port: 1433,
        options: {
            encrypt: true,
        },
        /* tslint:disable */
        password: result['Password'],
        /* tslint:enable */
        user: result['User ID'],
    };
}

export default parseConnectionString;
