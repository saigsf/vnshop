var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 模块
module.exports = mongoose.model("Goods", new Schema({
    productId: { type: String, unique: true },
    productName: String,
    salePrice: Number,
    productImage: String,
    productUrl: String,
    productNum: Number
}))