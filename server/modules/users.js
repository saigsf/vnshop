var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 模块
module.exports = mongoose.model("Users", new Schema({
    userId: String,
    userName: String,
    userPwd: Boolean,
    addressList: [{
        addressId: String,
        isDefault: Boolean,
        postCode: String,
        streetName: String,
        tel: String,
        userName: String
    }],
    cartList: [{
        checked: String,
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
        orderTotal: Number
    }]
}))