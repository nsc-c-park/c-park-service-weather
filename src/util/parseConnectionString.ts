export function parseConnectionString(connectionString) {
    // split connection string to key=value pairs
    const result = {};
    console.log(connectionString);
    connectionString.split(';').forEach((x) => {
        const arr = x.split('=');
        if (arr[1]) {
            result[arr[0]] = arr[1];
        }
    });

    // extract host and port from 'Data Source'
    let server;
    let port;
    const dataSource = result['Server'];
    console.log(dataSource);
    if (dataSource) {
        let match;
        const regex = /.*:(.*),([0-9]+)/;
        match = regex.exec(dataSource);
        if (match) {
            server = match[1];
            port = match[2];
        }
    }

    // extract user from 'User Id'
    let user;
    const userId = result['User ID'];
    console.log(userId);
    if (userId) {
        let match;
        const regex = /(.*)@.*/;
        match = regex.exec(userId);
        if (match) {
            user = match[1];
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
