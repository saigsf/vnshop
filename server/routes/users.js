var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/shop');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
db.once('close', () => console.log('Mongo connection faild'));



var Users = require("../modules/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('welcome user api');
});
router.get('/all', function(req, res, next) {
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

module.exports = router;