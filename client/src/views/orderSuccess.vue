<template>
    <div>
        <nav-header></nav-header>
        <nav-crumbs>orderSuccess</nav-crumbs>
        <div class="container">
            <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
                <ul>
                    <li class="cur"><span>Confirm</span> address</li>
                    <li class="cur"><span>View your</span> order</li>
                    <li class="cur"><span>Make</span> payment</li>
                    <li class="cur"><span>Order</span> confirmation</li>
                </ul>
            </div>

            <div class="order-create">
            <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
            <div class="order-create-main">
                <h3>Congratulations! <br>Your order is under processing!</h3>
                <p>
                <span>Order ID：{{msg.orderId}}</span>
                <span>Order total：{{msg.orderTotal}}</span>
                </p>
                <div class="order-create-btn-wrap">
                <div class="btn-l-wrap">
                    <!-- <a href="javascript:;" class="btn btn--m">Cart List</a> -->
                    <router-link to="/cart" class="btn btn--m">Cart List</router-link>
                </div>
                <div class="btn-r-wrap">
                    <!-- <a href="javascript:;" class="btn btn--m">Goods List</a> -->
                    <router-link class="btn btn--m" to="/goodsList" >Goods List</router-link>
                </div>
                </div>
            </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import '../../static/css/base.css'
import '../../static/css/checkout.css'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavCrumbs from '../components/NavCrumbs'
export default {
    name: 'OrderSuccess',
    components: {
        NavHeader,
        NavFooter,
        NavCrumbs
    },
    created(){
        this.getInfo()
    },
    data () {
        return {
            msg:{} ,
            orderId:''
        }
    },
    methods: {
        getInfo(){
            this.orderId=this.$route.query.orderId
            this.$https.get('/users/getOrderInfo',{
                params:{
                    orderId:this.orderId
                    }
                }).then((res)=>{
                    if(res.data.code===0){
                       this.msg=res.data.data 
                    }
                    
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
