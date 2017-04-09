import * as mssql from 'mssql';
import parseConnectionString from '../util/parseConnectionString';

export class DbConfig {
    public static config = parseConnectionString(process.env.SQLCONNSTR_WEATHERDB);

}

export default DbConfig;
