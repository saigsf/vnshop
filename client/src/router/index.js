import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Home from '@/views/Home'
import ShopList from '@/views/ShopList'
import Register from '@/views/register'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/GoodsList',
        name: 'GoodsList',
        component: GoodsList
    }, {
        path: '/shopList',
        name: 'ShopList',
        component: ShopList
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }]
})