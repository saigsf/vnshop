<template>
<div>
<nav-header></nav-header>
<div class="page_main ">
        <div class="container ">
            <div class="section section-order ">
                <div class="order-info clearfix ">
                    <div class="fl ">
                        <h2 class="title ">感谢您在本店购物！您的订单已提交成功，请记住您的订单号 <b>{{msg.orderId}}</b></h2>
                    </div>
                    <div class="fr ">
                        <p class="total ">您的应付款金额为 <span class="money "><em>{{msg.orderTotal}}.00<em>元</em></em></span></p>
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
                    <div style="text-align:center "><input type="button " onclick="window.open(
        'https://mapi.alipay.com/gateway.do?_input_charset=utf-8&extend_param=isv%5Esh22&logistics_fee=0&logistics_payment=BUYER_PAY_AFTER_RECEIVE&logistics_type=EXPRESS&notify_url=http%3A%2F%2Fmi.shudong.wang%2Frespond.php%3Fcode%3Dalipay&out_trade_no=201709208802476&partner=&payment_type=1&price=2557.00&quantity=1&return_url=http%3A%2F%2Fmi.shudong.wang%2Frespond.php%3Fcode%3Dalipay&seller_email=&service=trade_create_by_buyer&subject=2017092088024&sign=16805abae5f1fa2f8b3f7e4fd3380ab4&sign_type=MD5') "
                            value="立即使用支付宝支付 " /></div>
                </div>
            </div>

            <p style="text-align:center; margin-bottom:20px; ">您可以 <a href="index.php ">返回首页</a> 或去 <a href="user.php ">用户中心</a></p>
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
                userId:'100000077'
                }).then((res)=>{
                    this.msg=res.data.data
                    console.log(res)
                })
        }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
