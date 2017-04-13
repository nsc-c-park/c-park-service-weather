import {Router, Request, Response, NextFunction} from 'express';
import * as sql from 'mssql';
import DbConfig from '../config/DbConfig';

export class WeatherRouter {
  router: Router

  /**
   * Initialize the WeatherRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  public getAllWeather(req: Request, res: Response, next: NextFunction) {
      console.log(DbConfig.config);
      var dbConn = new sql.Connection(DbConfig.config);
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

    public getNewestWeather(req: Request, res: Response, next: NextFunction) {
      var dbConn = new sql.Connection(DbConfig.config);
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

const weatherRoutes = new WeatherRouter();
weatherRoutes.init();

export default weatherRoutes.router;
