'use strict';

var mongoose = require('mongoose');
var { createOrderId, createAddrId, createUserId, md5n, judge, decode, signToken } = require('../../auth/auth.service')
require('../../util/util')
var Users = require('../../modules/users');
var Goods = require('../../modules/goods');

// var ccap = require('ccap')();
// var config = require('../../config/env')

// 获取用户信息 ok
exports.getUserList = function(req, res, next) {
    var userName = req.query.userName || '';
    Users.find({ userName: userName }, function(err, result) {
        if (err) {
            return res.json({
                code: 3,
                msg: '系统错误，请联系管理员:q3185328602',
                data: err
            })
        } else {
            return res.json({
                code: 0,
                msg: "查询成功",
                data: result.length
            })
        }
    })
}

// 用户注册 ok
exports.addUser = function(req, res, next) {
    console.log("====post User=====");
    // console.log(req.body);
    var userName = req.body.userName ? req.body.userName.replace(/(^\s+)|(\s+$)/g, "") : '';
    var userPwd = req.body.userPwd ? req.body.userPwd.replace(/(^\s+)|(\s+$)/g, "") : '';
    var email = req.body.email ? req.body.email.replace(/(^\s+)|(\s+$)/g, "") : '';
    var userId = createUserId(new Date());

    // 需要作出判断，是否符合填写要求
    if (judge({ userName, userPwd, email })) {
        return res.status(422).json({
            code: 1000,
            msg: "用户信息格式不正确",
            data: judge({ userName, userPwd, email })
        });
    }
    var user = new Users({
        userName: userName,
        userPwd: md5n(userPwd),
        userId: userId
    });
    Users.findOne({
        userId: userId
    }, function(err, result) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "mongodb语句错误",
                data: err
            });
        }
        if (result) {
            return res.json({
                code: 2001,
                msg: "注册失败，用户名已存在",
                data: []
            });
        } else {
            user.save(function(err, result) {
                if (err) {
                    return res.json({
                        code: 3001,
                        msg: "注册失败，mongodb语句错误！",
                        data: err
                    });
                } else {
                    return res.json({
                        code: 0,
                        msg: "注册成功",
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

// 删除用户 需要获取后台权限 no
exports.destroy = function(req, res, next) {}

// 更新用户信息 需要获取后台权限 no
exports.updata = function(req, res, next) {}

// 前端用户登录 ok
exports.login = function(req, res, next) {
    console.log("=====get User=====");
    var { userName, userPwd } = req.body;
    Users.findOne({
        userName: userName
    }, function(err, result) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "登录失败，系统错误,mongodb语句错误",
                data: err
            });
        } else {
            if (result) {
                if (result.userPwd == md5n(userPwd)) {
                    var token = signToken(result.userId);
                    console.log(token)
                    res.cookie('userId', result.userId, {
                        path: '/',
                        maxAge: 1000 * 60 * 60 * 24
                    });
                    res.cookie('userName', result.userName, {
                        path: '/',
                        maxAge: 1000 * 60 * 60 * 24
                    });
                    res.cookie('token', token, {
                        path: '/',
                        maxAge: 1000 * 60 * 60 * 24
                    })
                    return res.json({
                        code: 0,
                        msg: "登录成功！",
                        data: {
                            userName: result.userName,
                            userId: result.userId,
                            token: 'token'
                        }
                    });
                } else {
                    return res.json({
                        code: 1001,
                        msg: "登录失败，密码错误~",
                        data: {}
                    });
                }

            } else {
                return res.json({
                    code: 2002,
                    msg: "登录失败，用户不存在",
                    data: []
                });
            }
        }

    });
}

// 前端用户登录验证 ok
exports.checkLogin = function(req, res, next) {

    if (req.cookies.userId) {
        Users.findOne({ userId: req.cookies.userId }, function(err, result) {
            if (result) {
                res.cookie('userId', result.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24
                });
                res.cookie('userName', result.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60 * 24
                });
                return res.json({
                    code: 0,
                    msg: "您已登录",
                    data: result.userName
                })
            } else {
                return res.json({
                    code: 2002,
                    msg: "用户不存在",
                    data: []
                })
            }
        })

    } else {
        return res.json({
            code: 2000,
            msg: "您未登录或者登录信息过期",
            data: []
        })
    }
}

// 退出登录 ok
exports.delLogin = function(req, res, next) {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1
    })
    return res.json({
        code: 0,
        msg: "您已退出",
        data: []
    })
}

// 获取用户信息 ok
exports.getInfo = function(req, res, next) {
    var userId = req.body.userId || req.cookies.userId;
    Users.findOne({
        userId: userId
    }, function(err, result) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "用户信息获取失败，系统错误，mongodb语句错误",
                data: err
            })
        } else {
            if (!result) {
                return res.json({
                    code: 2002,
                    msg: "用户不存在",
                    data: []
                })
            } else {
                return res.json({
                    code: 0,
                    msg: "用户信息获取成功",
                    data: result
                })
            }
        }

    })
}

// 前端用户自己更新数据 no
exports.mdUser = function(req, res, next) {}

// 添加购物车 ok
exports.addCart = function(req, res, next) {
    let productId = req.body.productId;
    let productNum = req.body.productNum || 1;
    let userId = req.body.userId || req.cookies.userId;

    Users.findOne({ userId: userId }, function(err, user) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "加入购物车失败，mongodb语句错误",
                data: err
            })
        } else {
            if (!user) {
                return res.json({
                    code: 2002,
                    msg: "用户不存在",
                    data: {}
                })
            }
            let goodItem = null;
            if (user.cartList) {
                user.cartList.forEach(function(item) {
                    if (item.productId == productId) {
                        item.productNum = parseInt(item.productNum) + parseInt(productNum);
                        goodItem = item;
                    }
                });
            }

            if (goodItem) {
                user.save(function(err, result) {
                    if (err) {
                        return res.json({
                            code: 3001,
                            msg: "加入购物车失败,数据库语句错误",
                            data: err
                        })
                    } else {
                        return res.json({
                            code: 0,
                            msg: "加入购物车成功",
                            data: result.cartList
                        })
                    }
                })
            } else {
                Goods.findOne({ productId: productId }, function(err, product) {
                    if (err) {
                        return res.json({
                            code: 3001,
                            msg: "加入购物车失败,数据库语句错误",
                            data: err
                        })
                    } else {
                        product.productNum = parseInt(productNum);
                        user.cartList.push(product)
                        user.save(function(err, result) {
                            if (err) {
                                return res.json({
                                    code: 0,
                                    msg: "加入购物车失败,数据库语句错误",
                                    data: err
                                })
                            } else {
                                return res.json({
                                    code: 0,
                                    msg: "加入购物车成功",
                                    data: result.cartList
                                })
                            }
                        })

                    }
                })
            }



        }
    })
}

// 获取购物车列表 ok
exports.getCartList = function(req, res, next) {

    let userId = req.body.userId || req.cookies.userId;
    Users.findOne({ userId: userId }, function(err, user) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "查看购物车失败,数据库语句错误 ",
                data: err
            })
        } else {
            if (user) {
                return res.json({
                    code: 0,
                    msg: "查看购物车成功",
                    data: user.cartList
                })
            } else {
                return res.json({
                    code: 2002,
                    msg: "查看购物车失败,用户不存在",
                    data: []
                })
            }
        }


    })
}

// 更新购物车商品状态 ok
exports.updateCart = function(req, res, next) {
    console.log("=====put cate=====");
    let userId = req.body.userId || req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.checked;

    Users.update({ userId: userId, 'cartList.productId': productId }, {
        'cartList.$.checked': checked
    }, function(err) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "数据更新失败，数据库语句错误",
                data: err
            })
        } else {
            return res.json({
                code: 0,
                msg: '数据更新成功',
                data: []
            })
        }
    })

}

// 更新购物车商品数量 ok
exports.updateProductNum = function(req, res, next) {
    console.log("=====put cate=====");
    let userId = req.body.userId || req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum;

    Users.update({ userId: userId, 'cartList.productId': productId }, {
        'cartList.$.productNum': productNum
    }, function(err) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "数据更新失败，数据库语句错误",
                data: err
            })
        } else {
            return res.json({
                code: 0,
                msg: '数据更新成功',
                data: []
            })
        }
    })

}

// 删除购物车列表 ok
exports.deleteCart = function(req, res, next) {
    console.log(req.body)
    let userId = req.query.userId || req.cookies.userId;
    let productId = req.body.productId;
    Users.update({ userId: userId }, { $pull: { 'cartList': { productId: productId } } },
        function(err) {
            if (err) {
                return res.json({
                    code: 3001,
                    msg: "数据删除失败，数据库语句错误",
                    data: err
                })
            } else {
                return res.json({
                    code: 0,
                    msg: '数据删除成功',
                    data: []
                })
            }
        })

}

// 获取地址 ok
exports.getAddr = function(req, res, next) {
    let userId = req.param('userId') || req.cookies.userId,
        addressId = req.param('addressId');
    Users.findOne({ userId: userId })
        .exec(function(err, result) {
            if (err) {
                return res.json({
                    code: 3001,
                    msg: "用户信息获取失败，数据库语句错误",
                    data: err
                })
            } else {
                if (result) {
                    if (addressId) {
                        let addressItem = ''
                        result.addressList.forEach((item) => {
                            if (item.addressId == addressId) {
                                addressItem = item;
                            }
                        });
                        if (addressItem) {
                            return res.json({
                                code: 0,
                                msg: "用户地址获取成功",
                                data: addressItem
                            })
                        } else {
                            return res.json({
                                code: 2002,
                                msg: "用户地址获取失败，地址不存在",
                                data: []
                            })
                        }
                    } else {
                        return res.json({
                            code: 0,
                            msg: "用户信息获取成功",
                            data: result.addressList
                        })
                    }



                } else {
                    return res.json({
                        code: 2002,
                        msg: "用户不存在",
                        data: []
                    })
                }
            }

        })
}

// 添加地址 ok
exports.addAddr = function(req, res, next) {
    let userId = req.body.userId || req.cookies.userId,
        address = req.body.address;

    address.addressId = createAddrId(new Date())
    Users.findOne({
        userId: userId
    }, function(err, user) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "收货地址添加失败，系统错误",
                data: err
            })
        } else {
            if (!user) {
                return res.json({
                    code: 2002,
                    msg: "用户不存在",
                    data: []
                })
            } else {
                user.addressList.push(address);

                user.save(function(err, result) {
                    if (err) {
                        return res.json({
                            code: 3001,
                            message: "收货地址添加失败,数据库语句错误",
                            data: err
                        })
                    } else {
                        return res.json({
                            code: 0,
                            msg: "收货地址添加成功",
                            data: result.addressList
                        })
                    }
                })

            }
        }

    })
}

// 更新地址 no
exports.updataAddr = function(req, res, next) {
    console.log("=====put cate=====");
    let userId = req.query.userId || req.cookies.userId,
        address = req.body.address;

}

//删除地址 ok
exports.delAddr = function(req, res, next) {
    let userId = req.query.userId || req.cookies.userId,
        addressId = req.query.addressId;
    Users.update({ userId: userId }, { $pull: { 'addressList': { addressId: addressId } } },
        function(err, result) {
            if (err) {
                return res.json({
                    code: 3001,
                    msg: "删除地址失败，数据库错误",
                    data: err
                })
            } else {
                return res.json({
                    code: 0,
                    msg: '删除地址成功',
                    data: result.addressList
                })
            }
        })
}

// 设置默认地址 ok
exports.setDefaultAddr = function(req, res, next) {
    let userId = req.query.userId || req.cookies.userId,
        addressId = req.query.addressId;

    Users.update({ userId: userId, 'addressList.isDefault': true }, {
            'addressList.$.isDefault': false
        },
        function(err, result) {
            if (err) {
                return res.json({
                    code: 3001,
                    msg: "默认地址设置失败，数据库错误",
                    data: err
                })
            } else {
                Users.update({ userId: userId, 'addressList.addressId': addressId }, {
                        'addressList.$.isDefault': true
                    },
                    function(err, result) {
                        if (err) {
                            return res.json({
                                code: 3001,
                                msg: "默认地址设置失败，数据库错误",
                                data: err
                            })
                        } else {
                            return res.json({
                                code: 0,
                                msg: '默认地址设置成功',
                                data: result.addressList
                            })
                        }
                    })
            }
        })

}

// 添加订单 ok
exports.addOrder = function(req, res, next) {

    let userId = req.body.userId || req.cookies.userId,
        goodsList = [],
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal,
        payType = req.body.payType,
        shopMethod = req.body.shopMethod,
        orderStatus = req.body.orderStatus || 0, //1表示已支付，0表示未支付
        orderId = createOrderId(new Date());

    let orderList = {
        goodsList: goodsList,
        addressInfo: {},
        orderTotal: orderTotal,
        payType: payType,
        shopMethod: shopMethod,
        orderStatus: orderStatus,
        orderId: orderId
    }
    Users.findOne({ userId: userId }, function(err, result) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "用户信息获取失败，数据库错误",
                data: err
            })
        } else {
            if (result) {
                result.cartList.forEach(function(item) {
                    if (item.checked == '1') {
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
                result.save(function(err, result) {
                    if (err) {
                        return res.json({
                            code: 3001,
                            msg: "用户信息获取失败，数据库错误",
                            data: err
                        })
                    } else {
                        return res.json({
                            code: 0,
                            msg: "订单提交成功",
                            data: { orderId: result.orderId }
                        })
                    }
                })

            } else {
                return res.json({
                    code: 2002,
                    msg: "用户不存在",
                    data: []
                })
            }
        }

    })










}

// 获取订单信息 ok
exports.getOrderInfo = function(req, res, next) {
    let userId = req.query.userId || req.cookies.userId;
    let orderId = req.query.orderId;
    var orderData = '';
    Users.findOne({ userId: userId }, function(err, result) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "用户信息获取失败，数据库错误",
                data: err
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
                        msg: "数据获取成功",
                        data: orderData
                    })
                } else {
                    return res.json({
                        code: 2002,
                        msg: "没有你想要的数据",
                        data: []
                    })
                }

            } else {
                return res.json({
                    code: 2002,
                    msg: "用户不存在",
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
    }, function(err) {
        if (err) {
            return res.json({
                code: 3001,
                msg: "用户信息获取失败，数据库错误",
                data: err
            })
        } else {
            return res.json({
                code: 0,
                msg: '订单支付成功成功',
                data: []
            })
        }
    })

}