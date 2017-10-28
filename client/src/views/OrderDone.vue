<template>
<div>
<nav-header></nav-header>
<div class="page_main ">
        <div class="container ">
            <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step ">
                    <ul>
                        <li class="cur"><span>Confirm</span> address</li>
                        <li class="cur"><span>View your</span> order</li>
                        <li class="cur"><span>Make</span> payment</li>
                        <li><span>Order</span> confirmation</li>
                    </ul>
                </div>
            <div class="section section-order ">
                
                <div class="order-info clearfix ">
                    <div class="fl ">
                        <h2 class="title ">感谢您在本店购物！您的订单已提交成功，请记住您的订单号 <b>{{msg.orderId}}</b></h2>
                    </div>
                </div>
                <i class="iconfont icon-right ">√</i>
                <div class="order-detail ">
                    <ul>
                        <li class="clearfix ">
                            <div class="label ">订单号:</div>
                            <div class="content ">
                                <div class="order-num ">{{msg.orderId}}</div>
                            </div>
                        </li>
                        <li class="clearfix ">
                            <div class="label ">您选定的配送方式为:</div>
                            <div class="content ">{{msg.shopMethod}}</div>
                        </li>
                        <li class="clearfix ">
                            <div class="label ">您选定的支付方式为:</div>
                            <div class="content ">{{msg.payType}}</div>
                        </li>
                        <li class="clearfix ">
                            <div class="label ">您的应付款金额为:</div>
                            <div class="content money "><em>{{msg.orderTotal}}.00<em>元</em></em>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>



            <div class="section section-payment ">
                <div class="pay_action ">
                    <div style="text-align:center ">
                        <router-link :to="{path:'/orderSuccess',query:{orderId:msg.orderId}}" >
                            <input type="button " value="立即使用支付宝支付 " />
                        </router-link>
                    </div>
                </div>
            </div>

            <p style="text-align:center; margin-bottom:20px; ">您可以 
                <router-link to="/">返回首页</router-link> 或去 
                <a >用户中心</a>
            </p>
        </div>
    </div>
    <nav-footer></nav-footer>


    </div>
</template>

<script>
import '../../static/css/styAll.css'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
export default {
    name: 'OrderDone',
    components: {
        NavHeader,
        NavFooter
    },
    created(){
        this.getInfo()
    },
    data () {
        return {
            msg: {}
        }
    },
    methods: {
        getInfo(){
            this.$https.get('/users/getOrderInfo',{
                params:{
                    orderId:this.$route.query.orderId
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
