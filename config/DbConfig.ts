import * as mssql from 'mssql';
import parseConnectionString from '../util/parseConnectionString';

export class DbConfig {
    public static config = parseConnectionString(process.env.SQLAZURECONNSTR_WEATHERDB);
}

export default DbConfig;
