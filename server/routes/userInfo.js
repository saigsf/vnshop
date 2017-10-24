var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); //用来创建和确认用户信息摘要
var config = require('../config/index.js'); //读取配置文件config.js信息

app.set('superSecret', config.secret); // 设置app 的超级密码--用来生成摘要的密码

// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/shop');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
db.once('close', () => console.log('Mongo connection faild'));

//加密算法
var md5 = function(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5WithRSAEncryption").update(str).digest("hex");
}

var Users = require("../modules/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('welcome userInfo api');
});

// router.use(function(req, res, next) {
//     //检查post的信息或者url查询参数或者头信息
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     // 解析 token
//     if (token) {

//         // 确认token
//         jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//             if (err) {
//                 return res.json({
//                     code: 3000,
//                     success: false,
//                     message: 'token信息错误.'
//                 });
//             } else {
//                 // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
//                 req.decoded = decoded;
//                 next();
//             }
//         });

//     } else {

//         // 如果没有token，则返回错误
//         return res.status(403).send({
//             success: false,
//             message: '没有提供token！'
//         });

//     }
// });

// 获取用户信息
router.post('/getInfo', function(req, res, next) {
    var name = req.body.name;
    Users.findOne({
        userName: name
    }, function(err, result) {
        if (err) {
            res.json({
                code: 3000,
                success: false,
                message: "用户信息获取失败，系统错误",
                data: err.message
            })
        } else {
            if (result.length == 0) {
                res.json({
                    code: 4000,
                    success: false,
                    message: "用户不存在",
                    data: []
                })
            } else {
                res.json({
                    code: 0,
                    success: true,
                    message: "用户信息获取成功",
                    data: result
                })
            }
        }

    })
});

// 修改用户信息
router.post('/modifyInfo', function(req, res, next) {
    res.json({
        status: 0,
        msg: "我是修改接口",
        data: []
    })
});

module.exports = router;