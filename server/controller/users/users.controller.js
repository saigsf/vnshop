'use strict';

var mongoose = require('mongoose');
var { createOrderId, createAddrId, createUserId, md5n } = require('../../auth/auth.service')
require('../../util/util')
var Users = require('../../modules/users');
var Goods = require('../../modules/goods');

// var ccap = require('ccap')();
// var config = require('../../config/env')

// 获取用户信息
exports.getUserList = function(req, res, next) {
    Users.find({}, function(err, result) {
        if (err) {
            return res.json({
                status: 1,
                msg: err.message
            })
        } else {
            return res.json({
                status: 0,
                msg: "查询成功",
                data: result

            })
        }
    })
}

// 用户注册
exports.addUser = function(req, res, next) {
    console.log("====post User=====");
    // console.log(req.body);
    var userName = req.body.userName ? req.body.userName.replace(/(^\s+)|(\s+$)/g, "") : '';
    var userPwd = req.body.userPwd ? req.body.userPwd.replace(/(^\s+)|(\s+$)/g, "") : '';
    var email = req.body.email ? req.body.email.replace(/(^\s+)|(\s+$)/g, "") : '';
    var userId = createUserId(new Date());
    // 需要作出判断，是否符合填写要求
    var email = req.body.email ? req.body.email.replace(/(^\s+)|(\s+$)/g, "") : '';
    var userName_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
    var userPwd_REGEXP = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    var error_msg;
    if (userName === '') {
        error_msg = "呢称不能为空";
    } else if (email === '') {
        error_msg = "邮箱地址不能为空";
    } else if (userName.length <= 2 || userName.length > 15 || !userName_REGEXP.test(userName)) {
        //不符合呢称规定.
        error_msg = "呢称不合法";
    } else if (email.length <= 4 || email.length > 30 || !EMAIL_REGEXP.test(email)) {
        error_msg = "邮箱地址不合法";
    } else if (!userPwd_REGEXP.test(userPwd)) {
        error_msg = "密码强度不够"
    }
    console.log(error_msg)
    if (error_msg) {
        return res.status(422).send({ error_msg: error_msg });
    }

    var user = new Users({
        userName: userName,
        userPwd: md5n(userPwd, 1),
        userId: userId
    });
    Users.findOne({
        userId: userId
    }, function(err, result) {
        if (err) {
            return res.json({
                code: 3000,
                success: false,
                message: "系统错误",
                data: err
            });
        }
        if (result) {
            return res.json({
                code: 2000,
                success: false,
                message: "注册失败，用户名已存在"
            });
        } else {
            user.save(function(err, result) {
                if (err) {
                    return res.json({
                        code: 3000,
                        success: false,
                        message: "注册失败，系统错误！",
                        data: err
                    });
                } else {
                    return res.json({
                        code: 0,
                        success: true,
                        message: "注册成功",
                        data: {
                            userName: result.userName,
                            userId: result.userId
                        }
                    });
                }
            })
        }
    });
}

// 删除用户 需要获取后台权限
exports.destroy = function(req, res, next) {}

// 更新用户信息 需要获取后台权限
exports.updata = function(req, res, next) {}

// 前端用户登录
exports.login = function(req, res, next) {
    console.log("=====get User=====");
    console.log(req.body)
    var { userName, userPwd } = req.body;

    Users.findOne({
        userName: userName
    }, function(err, result) {
        if (err) {
            return res.json({
                code: 3000,
                success: false,
                message: "登录失败，系统错误",
                data: err
            });
        }
        if (result) {
            console.log(result)
            console.log(md5n(userPwd, 1))
                // 58d65bdd8944dc8375c30b2ba10ae699
                // 58d65bdd8944dc8375c30b2ba10ae699
            if (result.userPwd == md5n(userPwd, 1)) {
                // var token = jwt.sign({
                //     msg: "hello"
                // }, app.get('superSecret'), {
                //     expiresIn: 60 * 60 * 24 // 24小时过期
                // });
                res.cookie('userId', result.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.cookie('userName', result.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                // res.cookie('token', token, {
                //     path: '/',
                //     maxAge: 1000 * 60 * 60
                // })
                return res.json({
                    code: 0,
                    success: true,
                    message: "登录成功！",
                    data: {
                        userName: result.userName,
                        userId: result.userId,
                        token: 'token'
                    }
                });
            } else {
                return res.json({
                    code: 2002,
                    success: false,
                    message: "登录失败，密码错误~",
                    data: {}
                });
            }

        } else {

            return res.json({
                code: 2001,
                success: false,
                message: "登录失败，用户不存在"
            });
        }
    });
}

// 前端用户登录验证
exports.checkLogin = function(req, res, next) {
    if (req.cookies.userId) {
        return res.json({
            code: 0,
            success: false,
            message: "您已登录",
            data: req.cookies.userName

        })
    } else {
        return res.json({
            code: 3000,
            success: false,
            message: "您未登录"
        })
    }
}

// 退出登录
exports.delLogin = function(req, res, next) {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1
    })
    return res.json({
        code: 0,
        success: true,
        message: "您已退出"
    })
}

// 获取用户信息
exports.getInfo = function(req, res, next) {
    var userId = req.body.userId || req.cookies.userId;
    Users.findOne({
        userId: userId
    }, function(err, result) {
        if (err) {
            return res.json({
                code: 3000,
                success: false,
                message: "用户信息获取失败，系统错误",
                data: err.message
            })
        } else {
            if (result.length == 0) {
                return res.json({
                    code: 4000,
                    success: false,
                    message: "用户不存在",
                    data: []
                })
            } else {
                return res.json({
                    code: 0,
                    success: true,
                    message: "用户信息获取成功",
                    data: result
                })
            }
        }

    })
}

// 前端用户自己更新数据
exports.mdUser = function(req, res, next) {

}

// 添加购物车
exports.addCart = function(req, res, next) {
    let productId = req.body.productId || req.cookies.userId;
    let productNum = req.body.productNum || 1;
    let userId = req.body.userId;
    Users.findOne({ userId: userId }, function(err, user) {
        if (err) {
            return res.json({
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
                        return res.json({
                            status: 2,
                            msg: "加入购物车失败",
                            data: err2.message
                        })
                    } else {
                        return res.json({
                            status: 0,
                            msg: "加入购物车成功",
                            data: user
                        })
                    }
                })
            } else {
                Goods.findOne({ productId: productId }, function(err1, product) {
                    if (err1) {
                        return res.json({
                            status: 0,
                            msg: "加入购物车失败",
                            data: err1.message
                        })
                    } else {
                        product.productNum = parseInt(productNum);

                        user.cartList.push(product)
                        user.save(function(err3) {
                            if (err3) {
                                return res.json({
                                    status: 0,
                                    msg: "加入购物车失败",
                                    data: err3.message
                                })
                            } else {
                                return res.json({
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
}

// 获取购物车列表
exports.getCartList = function(req, res, next) {

    let userId = req.body.userId || req.cookies.userId;
    Users.findOne({ userId: userId }, function(err, user) {
        if (err) {
            return res.json({
                status: 1,
                msg: "查看购物车失败",
                data: err.message
            })
        }
        if (user) {
            return res.json({
                status: 0,
                msg: "查看购物车成功",
                data: user.cartList
            })
        } else {
            return res.json({
                status: 1,
                msg: "查看购物车失败",
                data: []
            })
        }

    })
}

// 更新购物车商品状态
exports.updateCart = function(req, res, next) {
    console.log("=====put cate=====");
    let userId = req.body.userId || req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.checked;

    Users.update({ userId: userId, 'cartList.productId': productId }, {
        'cartList.$.checked': checked
    }, function(err, result) {
        if (err) {
            console.log(err);
            return res.json({
                code: 1,
                msg: err.message
            })
        } else {
            return res.json({
                code: 1,
                msg: '成功'
            })
        }
    })

}

// 更新购物车商品数量
exports.updateProductNum = function(req, res, next) {
    console.log("=====put cate=====");
    let userId = req.body.userId || req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum;

    Users.update({ userId: userId, 'cartList.productId': productId }, {
        'cartList.$.productNum': productNum
    }, function(err, result) {
        if (err) {
            console.log(err);
            return res.json({
                code: 1,
                msg: err.message
            })
        } else {
            return res.json({
                code: 1,
                msg: '成功'
            })
        }
    })

}

// 删除购物车列表
exports.deleteCart = function(req, res, next) {
    console.log(req.body)
    let userId = req.query.userId || req.cookies.userId;
    let productId = req.body.productId;
    Users.update({ userId: userId }, { $pull: { 'cartList': { productId: productId } } },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.json({
                    code: 1,
                    msg: err.message
                })
            } else {
                return res.json({
                    code: 0,
                    msg: '成功',
                    data: result
                })
            }
        })

}

// 获取地址
exports.getAddr = function(req, res, next) {
    let userId = req.param('userId') || req.cookies.userId,
        addressId = req.param('addressId');
    Users.findOne({ userId: userId })
        .exec(function(err, result) {
            if (err) {
                return res.json({
                    code: 3000,
                    success: false,
                    message: "用户信息获取失败，系统错误",
                    data: err.message
                })
            } else {
                if (result) {
                    if (addressId) {
                        result.addressList.forEach((item) => {
                            if (item.addressId == addressId) {
                                return res.json({
                                    code: 0,
                                    success: true,
                                    message: "用户信息获取成功",
                                    data: item
                                })

                            }
                        });
                    } else {
                        return res.json({
                            code: 0,
                            success: true,
                            message: "用户信息获取成功",
                            data: result.addressList
                        })
                    }



                } else {
                    return res.json({
                        code: 4000,
                        success: false,
                        message: "用户不存在",
                        data: []
                    })
                }
            }

        })
}

// 添加地址
exports.addAddr = function(req, res, next) {
    let userId = req.body.userId || req.cookies.userId,
        address = req.body.address;
    // console.log(address)

    // 需要生成addressId
    // address.addressId = createAddrId(new Date())
    console.log(address, createAddrId(new Date()))
    Users.findOne({
        userId: userId
    }, function(err, user) {
        if (err) {
            return res.json({
                code: 3000,
                success: false,
                message: "收货地址添加失败，系统错误",
                data: err.message
            })
        } else {
            if (user.length == 0) {
                return res.json({
                    code: 4000,
                    success: false,
                    message: "用户不存在",
                    data: []
                })
            } else {
                user.addressList.push(address);

                user.save(function(err1) {
                    if (err1) {
                        return res.json({
                            code: 1,
                            success: false,
                            message: "收货地址添加失败",
                            data: err1.message
                        })
                    } else {
                        return res.json({
                            code: 0,
                            success: true,
                            message: "收货地址添加成功",
                            data: user.addressList
                        })
                    }
                })

            }
        }

    })
}

// 更新地址
exports.updataAddr = function(req, res, next) {
    console.log("=====put cate=====");
    let userId = req.query.userId || req.cookies.userId,
        address = req.body.address;

}

//删除地址
exports.delAddr = function(req, res, next) {
    let userId = req.query.userId || req.cookies.userId,
        addressId = req.query.addressId;
    Users.update({ userId: userId }, { $pull: { 'addressList': { addressId: addressId } } },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.json({
                    code: 1,
                    msg: err.message
                })
            } else {
                return res.json({
                    code: 0,
                    msg: '成功',
                    data: result
                })
            }
        })
}

// 设置默认地址
exports.setDefaultAddr = function(req, res, next) {
    let userId = req.query.userId || req.cookies.userId,
        addressId = req.query.addressId;

    Users.update({ userId: userId, 'addressList.isDefault': true }, {
            'addressList.$.isDefault': false
        },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.json({
                    code: 1,
                    msg: err.message
                })
            } else {
                Users.update({ userId: userId, 'addressList.addressId': addressId }, {
                        'addressList.$.isDefault': true
                    },
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            return res.json({
                                code: 1,
                                msg: err.message
                            })
                        } else {
                            return res.json({
                                code: 0,
                                msg: '成功',
                                data: result
                            })
                        }
                    })
            }
        })

}



// 添加订单
exports.addOrder = function(req, res, next) {

    let userId = req.body.userId || req.cookies.userId,
        goodsList = [],
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal,
        payType = req.body.payType,
        shopMethod = req.body.shopMethod,
        orderStatus = req.body.orderStatus || 0, //1表示已支付，0表示未支付
        orderId = createOrderId(new Date());
    console.log(req.body)
    let orderList = {
        goodsList: goodsList,
        addressInfo: {},
        orderTotal: orderTotal,
        payType: payType,
        shopMethod: shopMethod,
        orderStatus: orderStatus,
        orderId: orderId
    }
    Users.findOne({ userId: userId })
        .exec(function(err, result) {
            if (err) {
                return res.json({
                    code: 3000,
                    success: false,
                    message: "用户信息获取失败，系统错误",
                    data: err.message
                })
            } else {
                if (result) {
                    result.cartList.forEach(function(item) {
                        if (item.checked == '1') {
                            console.log(item)
                            orderList.goodsList.push(item)
                            result.cartList.Remove(item, true)
                        }
                    })

                    result.addressList.forEach(function(item) {
                        if (item.isDefault) {

                            orderList.addressInfo = item
                        }
                    })

                    result.orderList.push(orderList);
                    result.save(function(err1) {
                        if (err1) {
                            return res.json({
                                code: 3000,
                                success: false,
                                message: "用户信息获取失败，系统错误",
                                data: err1.message
                            })
                        } else {
                            return res.json({
                                code: 0,
                                success: true,
                                message: "订单提交成功",
                                data: { orderId: orderId }
                            })
                        }
                    })

                } else {
                    return res.json({
                        code: 4000,
                        success: false,
                        message: "用户不存在",
                        data: []
                    })
                }
            }

        })










}

// 获取订单信息
exports.getOrderInfo = function(req, res, next) {
    let userId = req.query.userId || req.cookies.userId;
    let orderId = req.query.orderId;
    var orderData = '';
    Users.findOne({ userId: userId }, function(err, result) {
        if (err) {
            return res.json({
                code: 3000,
                success: false,
                message: "用户信息获取失败，系统错误",
                data: err.message
            })
        } else {
            if (result) {

                result.orderList.forEach((item) => {
                    if (item.orderId == orderId) {
                        orderData = item;
                    }
                })
                if (orderData) {
                    return res.json({
                        code: 0,
                        success: true,
                        message: "数据获取成功",
                        data: orderData
                    })
                } else {
                    return res.json({
                        code: 132,
                        success: false,
                        message: "没有你想要的数据",
                        data: orderData
                    })
                }

            } else {
                return res.json({
                    code: 4000,
                    success: false,
                    message: "用户不存在",
                    data: []
                })
            }
        }
    })
}

// 更改订单状态
exports.updateOrder = function(req, res, next) {
    let userId = req.body.userId || req.cookies.userId;
    let orderId = req.body.orderId;
    Users.update({ userId: userId, 'orderList.orderId': orderId }, {
        'orderList.$.orderStatus': '1'
    }, function(err, result) {
        if (err) {
            console.log(err);
            return res.json({
                code: 1,
                msg: err.message
            })
        } else {
            return res.json({
                code: 0,
                msg: '订单支付成功成功'
            })
        }
    })

}