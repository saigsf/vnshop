'use strict';

var mongoose = require('mongoose');
// var Users = mongoose.model('Users');
// var Goods = mongoose.model('Goods');
var Users = require('../../modules/users');
var Goods = require('../../modules/goods');
// var Logs = mongoose.model('Logs');
// var ccap = require('ccap')();
// var config = require('../../config/env')


exports.getUserList = function(req, res, next) {
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
}

exports.addUser = function(req, res, next) {
    console.log("====post User=====");
    console.log(req.body);
    var userName = req.body.userName ? req.body.userName.replace(/(^\s+)|(\s+$)/g, "") : '';
    var userPwd = req.body.userPwd ? req.body.userPwd.replace(/(^\s+)|(\s+$)/g, "") : '';

    // 需要作出判断，是否符合填写要求
    // 需要生成一个唯一的userId,

    Users.findOne({
        userName: userName
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
                userName: userName,
                userPwd: userPwd
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
                    res.json({
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
exports.destroy = function(req, res, next) {

}

// 更新用户信息 需要获取后台权限
exports.updata = function(req, res, next) {

}

// 前端用户登录
exports.login = function(req, res, next) {
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
                // var token = jwt.sign({
                //     msg: "hello"
                // }, app.get('superSecret'), {
                //     expiresIn: 60 * 60 * 24 // 24小时过期
                // });
                res.cookie('userId', result.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie('userName', result.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                // res.cookie('token', token, {
                //     path: '/',
                //     maxAge: 1000 * 60 * 60
                // })
                res.json({
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
}

// 前端用户登录验证
exports.checkLogin = function(req, res, next) {
    if (req.cookies.userId) {
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
}

// 退出登录
exports.delLogin = function(req, res, next) {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1
    })
    res.json({
        code: 0,
        success: true,
        message: "您已退出"
    })
}

// 获取用户信息
exports.getInfo = function(req, res, next) {
    var userId = req.body.userId;
    Users.findOne({
        userId: userId
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
}

// 前端用户自己更新数据
exports.mdUser = function(req, res, next) {

}

// 添加购物车
exports.addCart = function(req, res, next) {
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
}

// 获取购物车列表
exports.getCartList = function(req, res, next) {

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
}

// 删除购物车列表
exports.deleteCart = function(req, res, next) {
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

}

// 获取地址
exports.getAddr = function(req, res, next) {
    let userId = req.param('userId')

    Users.findOne({
        userId: userId
    }, function(err, result) {
        if (err) {
            res.json({
                code: 3000,
                success: false,
                message: "用户信息获取失败，系统错误",
                data: err.message
            })
        } else {
            if (result) {
                res.json({
                    code: 0,
                    success: true,
                    message: "用户信息获取成功",
                    data: result.addressList
                })

            } else {
                res.json({
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
    let userId = req.body.userId
    console.log(req.body.address)
    let address = {
        addressId: 2,
        isDefault: false,
        postCode: '710000',
        streetName: '陕西省西安市碑林区长安北路111号1401室',
        tel: '18659131413',
        userName: 'gsf'
    }
    Users.findOne({
        userId: userId
    }, function(err, user) {
        if (err) {
            res.json({
                code: 3000,
                success: false,
                message: "收货地址添加失败，系统错误",
                data: err.message
            })
        } else {
            if (user.length == 0) {
                res.json({
                    code: 4000,
                    success: false,
                    message: "用户不存在",
                    data: []
                })
            } else {
                user.addressList.push(address);

                user.save(function(err1) {
                    if (err1) {
                        res.json({
                            code: 1,
                            success: false,
                            message: "收货地址添加失败",
                            data: err1.message
                        })
                    } else {
                        res.json({
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

}

//删除地址
exports.delAddr = function(req, res, next) {

}