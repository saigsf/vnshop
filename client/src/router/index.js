import Vue from 'vue'
import Router from 'vue-router'
// 导入视图
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Home from '@/views/Home'
import ShopList from '@/views/ShopList'
import Register from '@/views/register'
import Login from '@/views/login'
import OrderDone from '@/views/OrderDone'
import RegisterLogin from '@/views/registerLogin'
import OrderList from '@/views/orderList'
import Detail from '@/views/detail'
import Address from '@/views/address'
import Cart from '@/views/cart'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/goodsList',
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
    }, {
        path: '/orderDone',
        name: 'OrderDone',
        component: OrderDone
    }, {
        path: '/registerLogin',
        name: 'RegistrLogin',
        component: RegisterLogin
    }, {
        path: '/orderList',
        name: 'OrderList',
        component: OrderList
    }, {
        path: '/detail',
        name: 'Detail',
        component: Detail
    }, {
        path: '/address',
        name: 'Address',
        component: Address
    }, {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }]
})