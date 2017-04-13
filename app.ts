import * as debugFactory from 'debug';
import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import sampleRoute from './routes/sample';

let debug = debugFactory('app:server');

let staticsPath = __dirname;

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(staticsPath, 'public')));

let port = process.env.PORT || 3000;

app.set('port', port);

app.use('/', sampleRoute);

var server = http.createServer(app);
server.listen(port);
server.on('error', function(err) {
console.error(err);
});
server.on('listening', function () {
var port = server.address().port;
debug('Listening on ' + port);
});
