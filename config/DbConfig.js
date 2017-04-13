"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseConnectionString_1 = require("../util/parseConnectionString");
class DbConfig {
}
DbConfig.config = parseConnectionString_1.default(process.env.SQLCONNSTR_WEATHERDB);
exports.DbConfig = DbConfig;
exports.default = DbConfig;
