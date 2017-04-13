"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sql = require("mssql");
const DbConfig_1 = require("../config/DbConfig");
class WeatherRouter {
    /**
     * Initialize the WeatherRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAllWeather(req, res, next) {
        console.log(DbConfig_1.default.config);
        var dbConn = new sql.Connection(DbConfig_1.default.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("select * from WeatherWroclaw").then(function (recordSet) {
                dbConn.close();
                res.send(recordSet);
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
    getNewestWeather(req, res, next) {
        var dbConn = new sql.Connection(DbConfig_1.default.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("select top 1 * from WeatherWroclaw order by id desc").then(function (recordSet) {
                dbConn.close();
                res.send(recordSet);
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
    init() {
        this.router.get('/', this.getAllWeather);
        this.router.get('/newest', this.getNewestWeather);
    }
}
exports.WeatherRouter = WeatherRouter;
const weatherRoutes = new WeatherRouter();
weatherRoutes.init();
exports.default = weatherRoutes.router;
