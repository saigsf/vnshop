'use strict';

var express = require('express');
var controller = require('./goods.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/list', controller.getGoodsList);
router.get('/getGoods', controller.getGoods)

module.exports = router;