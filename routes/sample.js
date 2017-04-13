///
"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        title: 'Hello World!'
    });
});
exports["default"] = router;
