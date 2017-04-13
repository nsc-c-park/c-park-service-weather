"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseConnectionString_1 = require("../util/parseConnectionString");
class DbConfig {
}
//public static config = parseConnectionString(process.env.SQLCONNSTR_WEATHERDB);
DbConfig.config = parseConnectionString_1.default('Server=tcp:weahterinfo.database.windows.net,1433;Initial Catalog=WeatherInfo;Persist Security Info=False;User ID=WeahterAdmin;Password=we@theradmin007;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;');
exports.DbConfig = DbConfig;
exports.default = DbConfig;
