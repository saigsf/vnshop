// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
// import VueResource from 'vue-resource'
// import BabelRuntime from 'babel-runtime'
import App from './App'
import Validator from 'vue-validator'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import apiConfig from '../config/api.config'
import '../static/css/font-awesome.min.css'

Vue.use(Validator)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: '../static/img/ok-2.png',
    attempt: 1
})
Vue.use(VueAxios, Axios)

Axios.defaults.baseURL = apiConfig.baseURl

Vue.prototype.$https = Axios
Vue.config.productionTip = false

// import '../static/css/index.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})