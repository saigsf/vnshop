var express = require('express');
var app = express();
var router = express.Router();
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



// 导入数据表
var Goods = require("../modules/goods");
var Users = require("../modules/users");


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

/* GET goods listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//添加购物车，并更新购物车数量
router.post('/addCart', function(req, res, next) {
    let productId = req.body.productId;
    let productNum = req.body.productNum || 1;
    let userId = req.body.userId;
    Users.findOne({ userId: userId }, function(err, user) {

        if (err) {
            res.json({
                status: 1,
                msg: "加入购物车失败",
                data: err.message
            })
        } else {
            let goodItem = null;
            user.cartList.forEach(function(item) {
                if (item.productId == productId) {
                    item.productNum = parseInt(item.productNum) + parseInt(productNum);
                    goodItem = item;

                }
            });
            if (goodItem) {
                user.save(function(err2) {
                    if (err2) {
                        res.json({
                            status: 2,
                            msg: "加入购物车失败",
                            data: err2.message
                        })
                    } else {
                        res.json({
                            status: 0,
                            msg: "加入购物车成功",
                            data: user
                        })
                    }
                })
            } else {
                Goods.findOne({ productId: productId }, function(err1, product) {
                    if (err1) {
                        res.json({
                            status: 0,
                            msg: "加入购物车失败",
                            data: err1.message
                        })
                    } else {
                        product.productNum = parseInt(productNum);

                        user.cartList.push(product)
                        user.save(function(err3) {
                            if (err3) {
                                res.json({
                                    status: 0,
                                    msg: "加入购物车失败",
                                    data: err3.message
                                })
                            } else {
                                res.json({
                                    status: 0,
                                    msg: "加入购物车成功",
                                    data: user
                                })
                            }
                        })

                    }
                })
            }



        }
    })
});

//查看购物车
router.post('/cartList', function(req, res, next) {

    let userId = req.body.userId;
    Users.findOne({ userId: userId }, function(err, user) {
        if (err) {
            res.json({
                status: 1,
                msg: "查看购物车失败",
                data: err.message
            })
        }
        if (user) {
            res.json({
                status: 0,
                msg: "查看购物车成功",
                data: user.cartList
            })
        } else {
            res.json({
                status: 1,
                msg: "查看购物车失败",
                data: []
            })
        }

    })
});

// 删除购物车
router.post('/deleteCart', function(req, res, next) {
    console.log(req.body)
    let userId = req.body.userId;
    let productId = req.body.productId;
    Users.findOne({ userId: userId }, function(err, user) {

        if (err) {
            res.json({
                status: 1,
                msg: "删除购物车失败",
                data: err.message
            })
        } else {
            if (user) {
                user.cartList.forEach(function(item) {
                    if (item.productId == productId) {
                        user.cartList.remove(item)
                    }
                })
                user.save(function(err1) {
                    if (err1) {
                        res.json({
                            status: 1,
                            msg: "删除购物车失败",
                            data: err1.message
                        })
                    } else {
                        res.json({
                            status: 0,
                            msg: "删除购物车成功",
                            data: user.cartList
                        })
                    }
                })


            } else {
                res.json({
                    status: 1,
                    msg: "删除购物车失败",
                    data: []
                })
            }
        }

    })

});



module.exports = router;