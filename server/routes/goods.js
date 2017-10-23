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

// 自动排序
function getNextSequenceValue(sequenceName) {
    var sequenceDocument = db.goods.findAndModify({
        query: { _id: sequenceName },
        update: { $inc: { sequence_value: 1 } },
        new: true
    });
    return sequenceDocument.sequence_value;
}

// 导入数据表
var Goods = require("../modules/goods");



/* GET goods listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/list', function(req, res, next) {

    let sort = req.query.sort || 1;
    let minPrice = req.query.minPrice || null;
    let maxPrice = req.query.maxPrice || null;
    let price = {};
    // 筛选
    if (minPrice && maxPrice) {
        price = { salePrice: { $gte: minPrice, $lte: maxPrice } }
    } else if (minPrice && !maxPrice) {
        price = { salePrice: { $gte: minPrice } }
    } else if ((!minPrice) && maxPrice) {
        price = { salePrice: { $lte: maxPrice } }
    } else {
        price = {}
    }
    console.log(price)
        // sort()排序， limit()限制查询数量
    Goods.find(price).sort({ 'salePrice': sort }).limit(8)
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

module.exports = router;