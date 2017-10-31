import Vue from 'vue'
import Router from 'vue-router'
import { delCookie, getCookie } from '@/util/util'
// 导入视图
// import HelloWorld from '@/components/HelloWorld'


import GoodsList from '@/views/GoodsList'
import Home from '@/views/Home'

import Register from '@/views/register'
import Login from '@/views/login'
import OrderDone from '@/views/OrderDone'
import RegisterLogin from '@/views/registerLogin'
import OrderList from '@/views/OrderList'
import Detail from '@/views/detail'
import Address from '@/views/address'
import AddAddr from '@/views/addAddr'
import Cart from '@/views/cart'
import OrderSuccess from '@/views/OrderSuccess'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/goodsList',
    name: 'GoodsList',
    component: GoodsList
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
}, {
    path: '/addAddr',
    name: 'AddAddr',
    component: AddAddr

}, {
    path: '/orderSuccess',
    name: 'OrderSuccess',
    component: OrderSuccess

}]

const router = new Router({
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//         fetch('/login').then(res => {
//             if (res.errCode == 200) {
//                 next();
//             } else {
//                 if (getCookie('session')) {
//                     delCookie('session');
//                 }
//                 if (getCookie('u_uuid')) {
//                     delCookie('u_uuid');
//                 }
//                 next({
//                     path: '/'
//                 });
//             }
//         });
//     } else {
//         next();
//     }
// });
export default router;