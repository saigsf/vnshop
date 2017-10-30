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
### 路由代码详情
```javascript
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
```
###### 2017年10月23日20:57:46
###### 2017年10月24日09:36:36

### vue-infinite-scroll 瀑布流加载
[vue-infinite-scroll](https://www.npmjs.com/package/vue-infinite-scroll)

#### 安装
```
npm install vue-infinite-scroll --save
```
#### CommonJS使用方式
```

You can use any build tool which supports commonjs:

// register globally
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)
 
// or for a single instance
var infiniteScroll = require('vue-infinite-scroll');
new Vue({
  directives: {infiniteScroll}
})
```
#### ES2015 使用方式
```
// register globally
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
 
// or for a single instance
import infiniteScroll from 'vue-infinite-scroll'
new Vue({
  directives: {infiniteScroll}
})
```

### 在组件中使用
在template中需要的位置插入
```
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  ...
</div>
```
在script中：
```
var count = 0;
 
new Vue({
  el: '#app',
  data: {
    data: [],
    busy: false
  },
  methods: {
    loadMore: function() {
      this.busy = true;
 
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }
  }
});
```
### vue-lazyload 图片懒加载
[vue-lazyload](https://www.npmjs.com/package/vue-lazyload)
#### 安装
```
$ npm install vue-lazyload
```
#### 配置
在main.js中导入
```
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
```
#### 使用方式
```
<script>
export default {
  data () {
    return {
      imgObj: {
        src: 'http://xx.com/logo.png',
        error: 'http://xx.com/error.png',
        loading: 'http://xx.com/loading-spin.svg'
      },
      imgUrl: 'http://xx.com/logo.png' // String
    }
  }
}
</script> 
 
<template>
  <div ref="container">
     <img v-lazy="imgUrl"/>
     <div v-lazy:background-image="imgUrl"></div>
 
     <!-- with customer error and loading -->
     <img v-lazy="imgObj"/>
     <div v-lazy:background-image="imgObj"></div>
 
     <!-- Customer scrollable element -->
     <img v-lazy.container ="imgUrl"/>
     <div v-lazy:background-image.container="img"></div>
 
    <!-- srcset -->
    <img v-lazy="'img.400px.jpg'" data-srcset="img.400px.jpg 400w, img.800px.jpg 800w, img.1200px.jpg 1200w">
    <img v-lazy="imgUrl" :data-srcset="imgUrl' + '?size=400 400w, ' + imgUrl + ' ?size=800 800w, ' + imgUrl +'/1200.jpg 1200w'" />
  </div>
</template>
```

### 父组件调用子组件方法$refs 2017年10月27日11:23:37
```
<template>
    <div id="app">
        <input type="button" name="" id="" @click="parentCall" value="父调子" />
        <hello ref="chil" />//hello组件
    </div>
</template>

<script>
    import hello from './components/Hello'
    export default {
        name: 'app',
        'components': {
            hello
        },
        methods: {
　　        parentCall () {
　　　　        this.$refs.chil.chilFn('我是父元素传过来的')
　　        }
        }
    }
</script>

/*Hello.vue  :*/

<template>
    <div class="hello"></div>
</template>

<script>
    export default {
        name: 'hello',
        'methods': {
　　       chilFn (msg) {
　　　　     alert(msg)
　　      }
        }
    }
</script>
```

#### 错误Can't set headers after they are sent. 重复调用res.json({})
```
Error: Can't set headers after they are sent.
    at ServerResponse.OutgoingMessage.setHeader (_http_outgoing.js:356:11)
    at ServerResponse.header (D:\phpStudy\WWW\myproject\vnshop\server\node_modul                         es\_express@4.15.5@express\lib\response.js:730:10)
    at ServerResponse.json (D:\phpStudy\WWW\myproject\vnshop\server\node_modules                         \_express@4.15.5@express\lib\response.js:253:10)
    at D:\phpStudy\WWW\myproject\vnshop\server\controller\users\users.controller                         .js:691:36
    at Array.forEach (native)
    at D:\phpStudy\WWW\myproject\vnshop\server\controller\users\users.controller                         .js:689:34
    at Query.<anonymous> (D:\phpStudy\WWW\myproject\vnshop\server\node_modules\_                         mongoose@4.12.4@mongoose\lib\model.js:3932:16)
    at D:\phpStudy\WWW\myproject\vnshop\server\node_modules\_kareem@1.5.0@kareem                         \index.js:273:21
    at D:\phpStudy\WWW\myproject\vnshop\server\node_modules\_kareem@1.5.0@kareem                         \index.js:131:16
    at _combinedTickCallback (internal/process/next_tick.js:67:7)

```
[解决方法](http://blog.csdn.net/qq_29380855/article/details/50692528)

### 错误1
```
errmsg:"E11000 duplicate key error collection: shop.users index: addressList.addressId_1 dup key: { : null }"
```
#### 解决方法
先运行 mongo 到 mongodb shell 命令行模式下,执行以下命令：
```
db.users.getIndexes(); //查看所有索引
db.users.dropIndex({"addressId":"1"}); 
```
[然后未解决。。。。。。。](https://stackoverflow.com/questions/36811174/errmsg-e11000-duplicate-key-error-collection-reduxpress-users-index-addres)


## 接口文档说明
待续····
## 服务器配置
### 购买服务器
[版瓦工](https://www.bwh1.net)
[阿里云](https://netcn.aliyun.com/)

### 注册域名
[阿里云](https://netcn.aliyun.com/)

### 服务器配置工具
安装[Xshell](http://rj.baidu.com/soft/detail/15201.html?ald)
### 使用方式
打开工具--->新建--->填写(名称，主机ip：69.171.77.35，端口号：29007)--->用户认证(用户(root)和密码(自己设置))
### 开始配置lnmp

1. apt-get update -y 对系统更新 出现Reading package lists... Done 算是成功
2. apt-get install zsh git curl -y 加载安装工具
3. cat /etc/issue 查看系统版本,这里使用Ubuntu 16.04
4. sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" 安装zsh
5. wget -c http://soft.vpser.net/lnmp/lnmp1.4.tar.gz && tar zxf lnmp1.4.tar.gz && cd lnmp1.4 && ./install.sh lnmp 安装lnmp,
6. 选择数据库版本默认就可以
7. 输入数据库密码---saigsf
8. 选择MySQL数据库引擎 ----输入y或直接回车，默认选择innoDB引擎
9. PHP引擎选择，默认5.5.38
10. 选择默认直接回车
11. 按任意键开始安装，Ctrl+c取消安装.
12. LNMP脚本就会自动安装编译Nginx、MySQL、PHP、phpMyAdmin、Zend Optimizer这几个软件。
13. 安装完成后，在浏览器中通过IP(http://69.171.77.35/)可以看到一个页面

### 安装node 
采用nvm安装node：https://github.com/creationix/nvm

#### 安装nvm脚本
试用以下两种方式：
```
To install or update nvm, you can use the install script using cURL:

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
or Wget:
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```
#### 配置nvm环境变量
```
export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

```
command -v nvm
```

#### 安装node

To download, compile, and install the latest release of node, do this:
```
nvm install node
```
And then in any new shell just use the installed version:
```
nvm use node
```
Or you can just run it:
```
nvm run node --version
```
Or, you can run any arbitrary command in a subshell with the desired version of node:
```
nvm exec 4.2 node --version
```
You can also get the path to the executable to where it was installed:
```
nvm which 5.0
```
#### 安装完成后,检测
```
node -v
```
### 安装[mongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
1. 导入公钥
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```
2. Create a list file for MongoDB
```
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```
3. Reload local package database
```
sudo apt-get update
```
4. Install the MongoDB packages
```
sudo apt-get install -y mongodb-org
```
### Run MongoDB Community Edition

1. Start MongoDB
```
sudo service mongod start
or
mongod --dbpath data/ --logpath log/mongodb.log -logappend --fork
```
2. Verify that MongoDB has started successfully
```
[initandlisten] waiting for connections on port <port>
```
>where <port> is the port configured in /etc/mongod.conf, 27017 by default.
3. Stop MongoDB
```
sudo service mongod stop
```
4. Restart MongoDB
```
sudo service mongod restart
```
5. Begin using MongoDB
### Uninstall MongoDB Community Edition
1. Stop MongoDB
```
sudo service mongod stop
```
2. Remove Packages
```
sudo apt-get purge mongodb-org*
```
3. Remove Data Directories.
```
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```


### 配置mongod.conf文件
```
vim /etc/mongod.conf
```
#### vim 命令操作
1. i 插入，下方出现insert 就可以编辑上面的信息
2. esc 退出编辑
3. :指令 对文件操作
