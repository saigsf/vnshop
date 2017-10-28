'use strict';

var express = require('express');
var controller = require('./users.controller');
// var auth = require('../../auth/auth.service');

var router = express.Router();

// 需要权限
router.post('/getUserList', controller.getUserList);
router.delete('/:id', controller.destroy);
router.put('/:id/updataUser', controller.updata);

// 前端用户操作
router.post('/register', controller.addUser);
router.post('/login', controller.login);
router.post('/updataInfo', controller.mdUser);
router.post('/getInfo', controller.getInfo);
router.post('/checkLogin', controller.checkLogin);
router.post('/delLogin', controller.delLogin)


//用户购物车操作
router.post('/addCart', controller.addCart);
router.post('/getCartList', controller.getCartList);
router.post('/deleteCart', controller.deleteCart);
router.post('/updateCart', controller.updateCart)
router.post('/updateNum', controller.updateProductNum)

// 用户收获地址操作
router.get('/getAddr', controller.getAddr);
router.post('/addAddr', controller.addAddr);
router.put('/updataAddr', controller.updataAddr);
router.get('/delAddr', controller.delAddr);
router.get('/setDefault', controller.setDefaultAddr)

// 订单操作
router.post('/addOrder', controller.addOrder)
router.get('/getOrderInfo', controller.getOrderInfo)
router.post('/updateOrder', controller.updateOrder)
















module.exports = router;