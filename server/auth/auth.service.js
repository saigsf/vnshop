'use strict';

var mongoose = require('mongoose');
// var passport = require('passport');
// var config = require('../config/env');
var jwt = require('jsonwebtoken');
// var expressJwt = require('express-jwt');
// var compose = require('composable-middleware');
// var Users = require('../../modules/users');
require('../util/util')

/** 
 * 验证token
 */
function authToken(credentialsRequired) {
    return compose()
        .use(function(req, res, next) {
            if (req.query && req.query.access_token) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            next();
        })
        .use(expressJwt({
            secret: config.session.secrets,
            credentialsRequired: credentialsRequired //是否抛出错误
        }))
}
/**
 * 验证用户是否登录
 */
function isAuthenticated() {
    return compose()
        .use(authToken(true))
        .use(function(err, req, res, next) {
            //expressJwt 错误处理中间件
            if (err.name === 'UnauthorizedError') {
                return res.json({ status: 300, msg: '用户未登录', result: "" })
            }
            next();
        })
        .use(function(req, res, next) {
            Users.findById(req.user._id, function(err, user) {
                if (err) return res.status(500).send();
                if (!user) return res.status(401).send();
                req.user = user;
                next();
            });
        });
}

/**
 * 生成token
 */
function signToken(id) {
    return jwt.sign({ _id: id }, config.session.secrets, { expiresIn: '1y' });
}

function createOrderId(time) {
    const ID_HEAD = 'VN';
    let R_1 = Math.floor(Math.random() * 100);
    let R_2 = Math.floor(Math.random() * 100);
    let date = (time).Format("yyyyMMddhhmm");
    return ID_HEAD + R_1 + date + R_2
}

function createAddrId(time) {
    const ID_HEAD = 'AD';
    let R_1 = Math.floor(Math.random() * 10);
    let R_2 = Math.floor(Math.random() * 10);
    let date = (time).Format("yyyyMM");
    return ID_HEAD + R_1 + date + R_2
}

function createUserId(time) {
    const ID_HEAD = 'ID';
    let R_1 = Math.floor(Math.random() * 100);
    let R_2 = Math.floor(Math.random() * 100);
    let date = (time).Format("yyyyMM");
    return ID_HEAD + R_1 + date + R_2
}

//加密算法
var md5 = function(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5WithRSAEncryption").update(str).digest("hex");
}

function md5n(data, n) {
    for (var i = 0; i < n; i++) {
        data = md5(data);
    }
    return data;
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.createOrderId = createOrderId;
exports.createAddrId = createAddrId;
exports.createUserId = createUserId;
exports.md5n = md5n;