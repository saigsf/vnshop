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



// 导入数据表
var Goods = require("../modules/goods");
var Users = require("../modules/users");


/* GET goods listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/list', function(req, res, next) {
    // console.log(req.param('sort'))

    // 排序
    let sort = req.query.sort || 1;

    // 分页
    let currentPage = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    let pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 8;
    let skip = (currentPage - 1) * pageSize;

    // 范围查询
    let priceLevel = req.query.priceLevel ? req.query.priceLevel : 'all';
    let priceGt, priceLte;
    let price = {};
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 2000;
                break;
            default:
                break;
        }
        price = { salePrice: { $gt: priceGt, $lte: priceLte } }

    }


    // sort()排序， limit()限制查询数量, 分页，筛选
    Goods.find(price)
        .sort({ 'salePrice': sort })
        .limit(pageSize)
        .skip(skip)
        .exec(function(err, result) {
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


router.post('/addCart', function(req, res, next) {
    let productId = req.body.productId;
    let productNum = req.body.productNum || 1;
    let userId = '100000077';
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

module.exports = router;