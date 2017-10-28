var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/shop');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
db.once('close', () => console.log('Mongo connection faild'));



var index = require('./routes/index');
// var users = require('./routes/users');
// var goods = require('./routes/goods');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 拦截器
app.use(function(req, res, next) {
    //检查post的信息或者url查询参数或者头信息
    var userId = req.cookies.userId;
    // 解析 token
    if (userId) {
        next();
    } else {
        if (req.path == '/users/register' ||
            req.path == '/goods/list' ||
            req.path == '/goods/getGoods' ||
            req.path == '/users/checkLogin' ||
            req.path == '/users/getCartList' ||
            req.path == '/users/login' ||
            req.path == '/users/delLogin' ||
            req.path == '/users/getUserList') {
            next();
        } else {
            // 如果没有token，则返回错误
            return res.status(403).json({
                success: false,
                message: '没有登录'
            });
        }


    }
});


app.use('/', index);
// app.use('/goods', goods);
// app.use('/order', order);



// require('./config/express')(app);
require('./routers')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;