'use strict';

var mongoose = require('mongoose');
// var Users = mongoose.model('Users');
// var Goods = mongoose.model('Goods');
var Users = require('../../modules/users');
var Goods = require('../../modules/goods');
// var Logs = mongoose.model('Logs');
// var ccap = require('ccap')();
// var config = require('../../config/env')

// 获取商品列表
exports.getGoodsList = function(req, res, next) {
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

}


// 获取单个商品
exports.getGoods = function(req, res, next) {
    var productId = req.param('productId');
    Goods.findOne({ productId: productId }, function(err, result) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "商品信息获取失败，数据库语句错误",
                data: err
            });
        } else {
            if (result) {
                return res.json({
                    code: 0,
                    msg: "商品信息获取成功",
                    data: result
                });
            } else {
                return res.json({
                    code: 2002,
                    msg: "商品不存在",
                    data: {}
                });
            }
        }
    })
}