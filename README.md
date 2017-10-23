# vue项目 2017年10月23日09:21:40

## 前端
使用vue-cli快速生成项目文档。
### 脚手架搭建

1、安装全局vue-cli
```
 npm install --global vue-cli
```
2、使用脚手架创建项目文档
```
vue init webpack vuetest
```
### 项目目录
```
your project
    client/     #前端文档
    server/     #后台文档
    note/       #说明文档
```
### 创建组件，视图 以home页为例
1、在src文件夹中创建view文件夹，在view文件夹中创建home.vue组件

2、home.vue的内容格式如下：
```
<template>

    #添加你的html内容，需要使用一个闭合的标签包裹，例如：
    <div>
        <nav-header></nav-header>  
        //···
        <nav-footer></nav-footer>
    </div>

</template>

<script>
//导入外部引入的css样式
import '../../static/css/index.css'
//导入子组件
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavCrumbs from '../components/NavCrumbs'

export default {    # 导出让其他地方可以使用
    name: 'Home',
    data () {       # 组件中数据要写成闭包的形式
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {   #引用子组件
        NavHeader,
        NavFooter,
        NavCrumbs
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    # 添加该组件自己的css样式
</style>
```
3、子组件：把header和footer做成子标签，这样可以在其他页面使用。

### 配置路由
在router/index.js文件中配置：
```
import Vue from 'vue'               # 导入vue
import Router from 'vue-router'     # 使用vue-router插件
import Home from '@/views/Home'     # 导入组件
//···其他组件

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    //···其他组件
    ]
})
```
### 在组件中使用路由实现单页切换
使用 router-link标签,通过to 属性添加要切换的路由，"/"表示根路由，如果没有则表示当前路由(可以用在子路由)
```
<router-link class="link" to="/login" rel="nofollow" >登录</router-link>
```
router-link默认映射为标签，当然可以改，除了to属性，其他属性可以根据自己的需要添加


## 在vue中图片懒加载详细介绍
### 说明
当网络加载比较慢的时候，

### 使用
使用vue的vue-lazyload，地址：https://www.npmjs.com/package/vue-lazyload

### 安装
#### npm/cnpm
```
$ npm install vue-lazyload/$ cnpm install vue-lazyload
```
#### CDN
CDN:https://unpkg.com/vue-lazyload/vue-lazyload.js
```
<script src="https://unpkg.com/vue-lazyload/vue-lazyload.js"></script>
<script>
  Vue.use(VueLazyload)
  ...
</script>
```
### 如何使用
在入口文件main.js中：
```
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)
 
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
 
new Vue({
  el: 'body',
  components: {
    App
  }
})
```
在组件中使用：把项目组件中的需要懒加载的 :src换成v-lazy,例如：
```
<div class="pic">
    <a href="#"><img :src="'static/img/'+item.productImage" alt=""></a>
</div>
```
替换后
```
<div class="pic">
    <a href="#"><img v-lazy="'static/img/'+item.productImage" alt=""></a>
</div>
```

## 后端

### 使用express-generator生成项目
[nodejs+mysql项目搭建](https://segmentfault.com/a/1190000011675867)
参考express 创建项目详解
### mongodb安装、配置、使用
[mongodb教程](http://www.runoob.com/mongodb/mongodb-tutorial.html),
[mongodb下载](https://www.mongodb.com/download-center#community)
[mongoose](http://www.nodeclass.com/api/mongoose.html)

可视化工具：[mongobooster](http://www.softpedia.com/get/Internet/Servers/Database-Utils/MongoBooster.shtml)

MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

### 数据库链接
```
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/shop');
```
### 添加监听事件
```
// 为这次连接绑定事件
const db = mongoose.connection;
// 数据库链接错误监听
db.once('error', () => console.log('Mongo connection error'));
// 数据库链接成功监听
db.once('open', () => console.log('Mongo connection successed'));
// 数据库关闭监听
db.once('close', () => console.log('Mongo connection faild'));
```
### 模块导出
```
module.exports = router;
```
### 文档代码
```javascript
var express = require('express');
var router = express.Router();
//导入mongoose插件
var mongoose = require('mongoose');

// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/shop');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
db.once('close', () => console.log('Mongo connection faild'));

// 导入集合模块
var Goods = require("../modules/goods");

/* GET goods listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加自己的路由
//···
module.exports = router;
```
### 集合模块代码
```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 模块
module.exports = mongoose.model("Goods", new Schema({
    productId: String,
    productName: String,
    salePrice: Number,
    productImage: String,
    productUrl: String
    //···
}))
```
### 路由配置
在app.js文件中完成路由配置，首先导入
```
var goods = require('./routes/goods');
```
然后
```
app.use('/goods', goods);
```
### 添加二级路由
```
router.get('/list', function(req, res, next) {
    res.send('respond with a resource');
    //添加数据库操作
    //···
});
```
## 数据库操作
### 查询数据并排序输出
在MongoDB中使用使用sort()方法对数据进行排序，sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。
[sort(mongoose文档)](http://www.nodeclass.com/api/mongoose.html#query_Query-sort)，
[sort菜鸟教程](http://www.runoob.com/mongodb/mongodb-sort.html)
```
//使用价格排序
Goods.find({}).sort({ 'salePrice': sort })
    .exec(function(err, result) {
        //···
    })
```
### 按照范围查找使用 $gte/$gt 和 $lte/$lt
[mongodb条件操作符](http://www.runoob.com/mongodb/mongodb-operators.html),
条件操作符用于比较两个表达式并从mongoDB集合中获取数据。MongoDB中条件操作符有：
```
(>) 大于 - $gt
(<) 小于 - $lt
(>=) 大于等于 - $gte
(<= ) 小于等于 - $lte
```
#### 使用方式
```
Goods.find({"likes" : {$gt : 100}}).exec(function(err,result){
    //···
})
```
### 限制查询数量limit()
如果你需要在MongoDB中读取指定数量的数据记录，可以使用MongoDB的Limit方法，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数。
#### 使用方式
```
Goods.find({"likes" : {$gt : 100}}).limit(8)
    .exec(function(err,result){
        //···
    })
```
### 跳过指定数量的数据skip()
我们除了可以使用limit()方法来读取指定数量的数据外，还可以使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数。skip()方法默认参数为 0 。
#### 使用方式
```
Goods.find({"likes" : {$gt : 100}}).limit(8).skip(0)
    .exec(function(err,result){
        //···
    })
```
###### 2017年10月23日20:57:46

待续····