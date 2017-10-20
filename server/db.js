// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/mydb');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    Email: String,
    tel: String,
    userInfo: {
        avatar: String,
        realName: String,
        resume: [{
            projName: String,
            projAddr: String,
            projType: String,
            projContent: String,
            isOnline: Boolean,
            duty: String,
        }]
    }
});

/************** 定义模型Model **************/
const Models = {
    Users: mongoose.model('Users', usersSchema)
}

module.exports = Models;