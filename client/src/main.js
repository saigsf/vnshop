// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'



Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: '../static/img/ok-2.png',
    attempt: 1
})
Vue.use(VueAxios, axios)
Vue.prototype.$https = axios
Vue.config.productionTip = false


// import '../static/css/index.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})