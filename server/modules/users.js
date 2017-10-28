var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 模块
module.exports = mongoose.model("Users", new Schema({
    userId: { type: String, unique: true },
    userName: { type: String, unique: true },
    userPwd: String,
    Email: String,
    addressList: [{
        addressId: String,
        isDefault: {
            type: Boolean,
            default: false
        },
        postCode: String,
        streetName: String,
        tel: String,
        userName: String,
        mobile: String,
        Email: String,
        sign_building: String,
        best_time: {
            type: Date,
            default: Date.now
        },
        country: String,
        province: String,
        city: String,
        district: String
    }],
    cartList: [{
        checked: {
            type: String,
            default: '0'
        },
        productId: String,
        productImage: String,
        productName: String,
        productNum: Number,
        salePrice: Number
    }],
    orderList: [{
        addressInfo: {
            addressId: String,
            isDefault: Boolean,
            postCode: String,
            streetName: String,
            tel: String,
            userName: String
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        goodsList: [{
            checked: String,
            productId: String,
            productImage: String,
            productName: String,
            productNum: Number,
            salePrice: Number
        }],
        orderId: String,
        orderStatus: String,
        orderTotal: Number,
        payType: String,
        shopMethod: String
    }]
}))