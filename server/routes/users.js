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


// 自动排序
function getNextSequenceValue(sequenceName) {
    var sequenceDocument = db.users.findAndModify({
        query: { _id: sequenceName },
        update: { $inc: { sequence_value: 1 } },
        new: true
    });
    return sequenceDocument.sequence_value;
}

var Users = require("../modules/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('welcome user api');
});
router.post('/all', function(req, res, next) {
    Users.find({}, function(err, result) {
        if (err) {
            res.json({
                status: 1,
                msg: err.message
            })
        } else {
            res.json({
                status: 0,
                msg: "查询成功",
                data: result

            })
        }
    })
});

// 注册
router.post('/register', function(req, res, next) {
    console.log("====post User=====");
    var { name, password } = req.body;
    Users.findOne({
        userName: name
    }, function(err, result) {
        if (err) {
            res.json({
                code: 3000,
                success: false,
                message: "系统错误",
                data: err
            });
        }
        console.log(result);
        if (result) {
            res.json({
                code: 2000,
                success: false,
                message: "注册失败，用户名已存在"
            });
        } else {
            var users = new Users({
                userName: name,
                userPwd: md5(password)
            });

            users.save(function(err, result) {
                if (err) {
                    res.json({
                        code: 3000,
                        success: false,
                        message: "注册失败，系统错误！",
                        data: err
                    });
                } else {
                    console.log("success");
                    res.json({
                        code: 0,
                        success: true,
                        message: "注册成功",
                        data: {
                            name: result.name,
                            id: result._id
                        }
                    });
                }
            })
        }
    });
});

// 登录
router.post('/login', function(req, res, next) {
    console.log("=====get User=====");
    console.log(req.body)
    var { userName, userPwd } = req.body;

    Users.findOne({
        userName: userName
    }, function(err, result) {
        if (err) {
            res.json({
                code: 3000,
                success: false,
                message: "登录失败，系统错误",
                data: err
            });
        }
        if (result) {
            if (result.userPwd === userPwd) {
                var token = jwt.sign({
                    msg: "hello"
                }, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 24 // 24小时过期
                });
                res.cookie('userId', result.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie('userName', result.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie('token', token, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.json({
                    code: 0,
                    success: true,
                    message: "登录成功！",
                    data: {
                        userName: result.userName,
                        userId: result.userId,
                        token: token
                    }
                });
            } else {
                res.json({
                    code: 2002,
                    success: false,
                    message: "登录失败，密码错误~"
                });
            }

        } else {
            console.log(result);
            res.json({
                code: 2001,
                success: false,
                message: "登录失败，用户不存在"
            });
        }
    });
});

// 检查是否登录
router.post('/checkLogin', function(req, res, next) {
    if (req.cookies.token) {
        res.json({
            code: 3000,
            success: false,
            message: "您已登录",
            data: req.cookies.userName

        })
    } else {
        res.json({
            code: 3000,
            success: false,
            message: "您未登录"
        })
    }
})

// 退出登录
router.post('/delLogin', function(req, res, next) {
    res.cookie('token', '', {
        path: '/',
        maxAge: -1
    })
    res.json({
        code: 0,
        success: true,
        message: "您已退出"
    })
})


module.exports = router;