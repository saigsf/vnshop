// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/register', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')

    console.log(req.body)
    let newuser = new models.Users({
        username: req.body.username,
        password: req.body.password,
        Email: req.body.email,
        tel: req.body.tel,
        userInfo: {
            avatar: req.body.avatar,
            realName: req.body.realName,
            resume: [{
                projName: req.body.projName,
                projAddr: req.body.projAddr,
                projType: req.body.projType,
                projContent: req.body.projContent,
                isOnline: req.body.isOnline,
                duty: req.body.duty,
            }]
        }
    });

    // 保存数据newuser数据进mongoDB
    newuser.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            // res.send('createuser successed');
            res.json({
                code: 0,
                msg: 'createuser successed',
                data: newuser
            });
        }
    });
});
// 获取已有账号接口
router.get('/api/login', (req, res) => {
    // 通过模型去查找数据库
    models.Users.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            // res.send(data);
            res.json({
                code: 0,
                msg: 'getUser successed',
                data: data
            });
        }
    });
});

module.exports = router;