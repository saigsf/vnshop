<template>
<div>
    <nav-header ref="child"></nav-header>
    <nav-crumbs>orderlist</nav-crumbs>
    <div class="page-main">
        <div class="container clearfix">
            
            <div class="checkout-box confirm-order-box">
                <div class="page-title-normal">
                    <h2 class="page-title-h2"><span>check out</span></h2>
                </div>
                <!-- 进度条 -->
                <div class="check-step">
                    <ul>
                        <li class="cur"><span>Confirm</span> address</li>
                        <li class="cur"><span>View your</span> order</li>
                        <li><span>Make</span> payment</li>
                        <li><span>Order</span> confirmation</li>
                    </ul>
                </div>
                <h2>确认订单信息页面</h2>
                <div class="flowBox_in">
                    <form action="flow.php" method="post" name="theForm" id="theForm" onsubmit="return checkOrderForm(this)">
                        
                        <ul class="box-main clearfix">
                            <li class="section-options clearfix">
                                <h3 class="section-header"><span>收货人信息</span></h3>
                                <div class="section-body">
                                    <div class="checkout-item active">{{address.userName}}</div>
                                    <span class="addr-name">{{address.userName}}</span>
                                    <span class="addr-info">{{address.streetName}}</span>
                                    <span class="addr-tel">{{address.tel}}</span>
                                    <router-link to="/address" class="modify">修改</router-link>
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <h3 class="section-header"><span>支付方式</span></h3>
                                <div class="section-body">
                                    <ul class="item-list clearfix payment-list" id="payment-list">

                                        <li v-for="(item ,idx) in paymentType" :key="idx" :class="{'active':item.checked} " @click="setPayType(item)" >
                                            <label class="checkout-item"  for="payment_1">{{item.title}}</label>
                                            <!-- <input type="radio" name="payment" class="radio" id="payment_1" value="5" isCod="0" onclick="selectPayment(this)" /> -->
                                            <div class="text" v-show="item.checked" ><i></i>手续费：{{item.free}}.00<em>元</em> </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="section-options clearfix section-shipping">
                                <h3 class="section-header"><span>配送方式</span></h3>
                                <div class="section-body">
                                    <ul class="item-list clearfix payment-list" id="shipping-list">
                                        <li v-for="(item ,idx) in shopMethods" :key="idx" :class="{'active':item.checked} " @click="setShopMethod(item)" >
                                            <label class="checkout-item"  for="payment_1">{{item.title}}</label>
                                            <!-- <input type="radio" name="payment" class="radio" id="payment_1" value="5" isCod="0" onclick="selectPayment(this)" /> -->
                                            <div class="text" v-show="item.checked" >
                                                <i></i>费用：{{item.free}}.00<em>元</em>&nbsp;&nbsp;免费额度：100000.00<em>元</em>
                                            </div>
                                        </li>
                                    </ul>
                                    <div style="margin-top:20px;">
                                        <label for="ECS_NEEDINSURE">
                                            <input name="need_insure" id="ECS_NEEDINSURE" type="checkbox"  onclick="selectInsure(this.checked)" value="1"  disabled="true"  /> 配送是否需要保价 
                                        </label>
                                    </div>
                                </div>
                            </li>

                            
                            <li class="section-options clearfix section-goods">
                                <!-- order list -->
                                <div class="page-title-normal section-header checkout-title">
                                    <h2 class="title"><span>商品列表</span></h2>
                                    <router-link to="/cart" class="modify ">返回购物车<i class="iconfont"></i></router-link>
                                </div>
                                <div class="item-list-wrap confirm-item-list-wrap">
                                    <div class="cart-item order-item">
                                    <div class="cart-item-head">
                                        <ul>
                                        <li>商品信息</li>
                                        <li>单价</li>
                                        <li>数量</li>
                                        <li>小计</li>
                                        </ul>
                                    </div>
                                    <ul class="cart-item-list">
                                        <li  v-for="(item,idx) in goodsList" :key="idx" v-if="item.checked==='1'" >
                                        <div class="cart-tab-1">
                                            <div class="cart-item-pic">
                                                <img :src="'/static/img/'+item.productImage" :title="item.productName"  />
                                            </div>
                                            <div class="cart-item-title">
                                                <div class="item-name">{{item.productName}}</div>
                                            </div>
                                        </div>
                                        <div class="cart-tab-2">
                                            <div class="item-price">{{item.salePrice}}</div>
                                        </div>
                                        <div class="cart-tab-3">
                                            <div class="item-quantity">
                                                <div class="select-self">
                                                    <div class="select-self-area">
                                                        <span class="select-ipt">×{{item.productNum}}</span>
                                                    </div>
                                                </div>
                                                <div class="item-stock item-stock-no">In Stock</div>
                                            </div>
                                        </div>
                                        <div class="cart-tab-4">
                                            <div class="item-price-total">${{item.salePrice*item.productNum}}</div>
                                        </div>
                                        </li>
                                    </ul>
                                    </div>
                                </div>

                            </li>

                            <li class="section-options clearfix">
                                <h3 class="section-header">其它信息</h3>
                            </li>


                            <li class="section-options clearfix">
                                <h3 class="section-header">使用红包</h3>
                                <div class="section-body">
                                    <span class="item">
            	选择已有红包 
                  <select name="bonus" onchange="changeBonus(this.value)" id="ECS_BONUS" style="border:1px solid #ccc;">
                    <option value="0" selected>请选择</option>
                                      </select>
                  </span>
                                    <span class="item">
                  或者输入红包序列号 
                  <input name="bonus_sn" type="text" class="inputBg" size="15" value="" />
                  </span>
                                    <span class="item">
                  <input name="validate_bonus" type="button" class="bnt_blue_1" value="验证红包" onclick="validateBonus(document.forms['theForm'].elements['bonus_sn'].value)" style="vertical-align:middle;" />
                  </span>
                                </div>
                            </li>

                            <li class="section-options clearfix">
                                <h3 class="section-header">开发票&nbsp;<input name="need_inv" type="checkbox" class="input" id="ECS_NEEDINV" onclick="changeNeedInv()" value="1" /></h3>
                                <div class="section-body">

                                    <span class="item">
                  发票类型 
                  <select name="inv_type" id="ECS_INVTYPE" disabled="true" onchange="changeNeedInv()" style="border:1px solid #ccc;">
                   <option value="1">1 [1%]</option><option value="2">2 [1.5%]</option><option value="3">3 [0%]</option>                  </select>
                  </span>
                                    <span class="item"> 
                  发票抬头 
                  <input name="inv_payee" type="text"  class="input" id="ECS_INVPAYEE" size="20" disabled="true" value="" onblur="changeNeedInv()" />
                  </span>
                                    <span class="item">
                  发票内容 
                  <select name="inv_content" id="ECS_INVCONTENT" disabled="true"  onchange="changeNeedInv()" style="border:1px solid #ccc;">
                  <option value="办公用品">办公用品</option><option value="食品">食品</option><option value="礼品">礼品</option><option value="服装">服装</option>  				  </select>
                  </span>
                                </div>
                            </li>

                            <li class="section-options clearfix">
                                <h3 class="section-header">订单附言</h3>
                                <div class="section-body">
                                    <textarea name="postscript" cols="80" rows="3" id="postscript" style="border:1px solid #ccc;"></textarea>
                                </div>
                            </li>

                            <li class="section-options clearfix">
                                <h3 class="section-header">缺货处理</h3>
                                <div class="section-body">
                                    <ul class="item-list clearfix" id="quehuo-list">
                                        <li>
                                            <label class="checkout-item" for="how_oos_0" >等待所有商品备齐后再发</label>
                                            <!-- <input name="how_oos" id="how_oos_0" type="radio" value="0" class="radio" checked onclick="changeOOS(this)" /> -->
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="how_oos_1"  >取消订单</label>
                                            <!-- <input name="how_oos" id="how_oos_1" type="radio" value="1" class="radio" onclick="changeOOS(this)" /> -->
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="how_oos_2" >与店主协商</label>
                                            <!-- <input name="how_oos" id="how_oos_2" type="radio" value="2" class="radio" onclick="changeOOS(this)" /> -->
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="section-options clearfix section-count">
                                <!--<h3 class="section-header"><span>费用总计</span></h3>-->
                                <div id="ECS_ORDERTOTAL" class="money-box">
                                    <ul>
                                        <li class="clearfix">
                                            <label>订购即送：</label>
                                            <span class="val"> 
                                                <font class="f4_b">{{totalPrice}}</font> 积分            ，以及价值               <font class="f4_b">0.00<em>元</em></font>的红包。
                                            
                                            </span>
                                        </li>
                                        <li class="clearfix">
                                            <label>商品总价：</label><span class="val">{{totalPrice}}.00<em>元</em></span>
                                        </li>
                                        <li class="clearfix total-price">
                                            <label>应付款金额：</label> <span class="val"><em>{{totalPrice}}.00<em>元</em></em></span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="section-options clearfix" style="border-bottom:none;">
                                <div style="margin:8px auto; text-align:right;">
                                    <!-- <router-link to="/orderDone" > -->
                                        <input class="btn btn--m btn--red" type="button" value="提交订单并支付" @click="orderDone" />
                                    <!-- </router-link> -->
                                    <!-- <input type="hidden" name="step" value="done" /> -->
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <nav-footer></nav-footer>
    <modal :mdShow="payTypeConfirm">
        <div slot="message" class="confirm-tips" >亲！您没有选择支付方式</div>
        <button slot="close" class="md-close" @click="payTypeConfirm=false" >Close</button>
        <a  slot="btnGroup" class="btn-wrap" >
            <input class="btn btn-gray" type="button" value="取消" @click="payTypeConfirm=false" >
            <input class="btn btn-gray" type="button" value="确定" @click="payTypeConfirm=false">
        </a>
    </modal>
    <modal :mdShow="shopMethodConfirm">
        <div slot="message" class="confirm-tips" >亲！您没有选择配送方式</div>
        <button slot="close" class="md-close" @click="shopMethodConfirm=false" >Close</button>
        <a  slot="btnGroup" class="btn-wrap" >
            <input class="btn btn-gray" type="button" value="取消" @click="shopMethodConfirm=false" >
            <input class="btn btn-gray" type="button" value="确定" @click="shopMethodConfirm=false">
        </a>
    </modal>
</div>
</template>

<script>
import '../../static/css/styAll.css'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavCrumbs from '../components/NavCrumbs'
import Modal from '../components/Modal'
export default {
    name: 'OrderList',
    components: {
        NavHeader,
        NavFooter,
        NavCrumbs,
        Modal
    },
    created () {
        this.getCheckedGoods();
        this.getAddrList()
    },
    data () {
        return {
            goodsList:[],
            address:{},
            totalPrice:0,
            paymentType:[
                {
                    title:'快钱人民币网关',
                    free:3,
                    checked:false
                },{
                    title:'余额支付',
                    free:3,
                    checked:false
                },{
                    title:'银行汇款/转账',
                    free:3,
                    checked:false
                },{
                    title:'货到付款',
                    free:3,
                    checked:false
                },{
                    title:'网银在线',
                    free:3,
                    checked:false
                },{
                    title:'支付宝',
                    free:3,
                    checked:false
                }
            ],
            shopMethods:[
                {
                    title:'申通快递',
                    free:15,
                    checked:false
                },{
                    title:'城际快递',
                    free:10,
                    checked:false
                },{
                    title:'邮局平邮',
                    free:3,
                    checked:false
                },{
                    title:'中通快递',
                    free:5,
                    checked:false
                }
            ],
            payType:'',
            payTypeConfirm:false,
            shopMethod:'',
            shopMethodConfirm:false
        }
    },
    methods:{
        getCheckedGoods(){
            this.$https.post('/users/getCartList',).then((res)=>{
                console.log(res)
                if(res.data.code===0){
                    this.goodsList=res.data.data
                    this.getTotal();
                }else{
                    this.$refs.child.isError()
                }
            })
        },
        getAddrList(){
            let addressId =this.$route.query.addressId
            
            this.$https.get('/users/getAddr',{
                params:{
                    addressId:addressId
                }
            }).then(result=>{
                if(result.data.code===0){
                    var res=result.data.data;
                    if(!addressId){
                        res.forEach((item)=> {
                            if(item.isDefault){
                                this.address=item
                            }
                        });
                    }else{
                        this.address=res;
                    }
                }else{
                    this.$refs.child.isError()
                }
                
                
            })
        },
        getTotal(){
            this.goodsList.forEach((item)=>{
                if(item.checked=='1'){
                    this.totalPrice+=item.salePrice*item.productNum
                }
            });
        },
        setPayType(item){
            this.paymentType.forEach(function(val){
                val.checked=false
            })
            item.checked=!item.checked;

        },
        setShopMethod(item){
            this.shopMethods.forEach(function(val){
                val.checked=false
            })
            item.checked=!item.checked;
        },
        orderDone(){

            if(this.getType()){
                this.payTypeConfirm=true;
            }else if(this.getMethod()) {
                this.shopMethodConfirm=true;
            }else{
                this.$https.post('/users/addOrder',{
                    addressId :this.address.addressId,
                    orderTotal :this.totalPrice,
                    payType :this.payType,
                    shopMethod : this.shopMethod,
                }).then((res)=>{
                    if(res.data.code==0)this.$router.push({path:'/orderDone',query:{orderId:res.data.data.orderId}})

                })
            }
            
        },
        getType(){
            this.paymentType.forEach(function(item){
                if(item.checked){
                    this.payType=item.title
                }
            },this);
            if(this.payType){
                return false;
            }else{
                return true;
            }
        },
        getMethod(){
            this.shopMethods.forEach(function(item){
                if(item.checked){
                    this.shopMethod=item.title
                }
            },this);
            if(this.shopMethod){
                return false;
                // 
            }else{
                return true;
            }
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.check-step{
    margin: 0 30px 0 30px
}
</style>
