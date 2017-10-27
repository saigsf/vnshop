<template>
<div>
    <nav-header></nav-header>
    <div class="page-main">
        <div class="container clearfix">
            <div class="checkout-box confirm-order-box">
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
                                <div class="section-header clearfix">
                                    <h3 class="title">商品列表</h3>
                                    <router-link to="/cart" class="modify">返回购物车<i class="iconfont"></i></router-link>
                                </div>
                                <table width="100%" align="center" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd" class="goods-list-table">
                                    <tr bgcolor="#cccccc">
                                        <th  align="center" style="text-align:center" >商品信息</th>
                                        <th align="center" style="text-align:center">单价*数量</th>
                                        <th align="center" style="text-align:center">价格小计</th>
                                    </tr>
                                    <tr  v-for="(item,idx) in goodsList" :key="idx" v-if="item.checked==='1'">
                                        <td bgcolor="#ffffff">
                                            <img :src="'/static/img/'+item.productImage" :title="item.productName" width="30" height="30" />
                                            <a  target="_blank" class="f6">{{item.productName}} </a>
                                        </td>
                                        <td bgcolor="#ffffff" align="center">{{item.salePrice}}<em>元</em>&nbsp;x&nbsp;{{item.productNum}}</td>
                                        <td bgcolor="#ffffff" align="center"><span style="color:#ff6700;">{{item.salePrice*item.productNum}}.00<em>元</em></span></td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" colspan="7">
                                            <!-- <span  >您还没有加入商品</span> -->
                                            <span>购物金额小计 2547.00<em>元</em>，比市场价 3034.80<em>元</em> 节省了 487.80<em>元</em> (16%)</span>
                                            
                                        </td>
                                    </tr>
                                </table>
                            </li>


                            <li class="section-options clearfix section-goods">
                                <h3 class="section-header"><span>祝福贺卡</span></h3>
                                <table width="100%" align="center" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd" id="cardTable" class="goods-list-table">
                                    <tr >
                                        <th bgcolor="#ffffff" width="5%" scope="col">&nbsp;</th>
                                        <th bgcolor="#ffffff" width="35%" scope="col">名称</th>
                                        <th bgcolor="#ffffff" width="22%" scope="col" align="center">价格</th>
                                        <th bgcolor="#ffffff" width="22%" scope="col" align="center">免费额度</th>
                                        <th bgcolor="#ffffff" scope="col" align="center">图片</th>
                                    </tr>
                                    <tr >
                                        <td bgcolor="#ffffff" valign="top"><input type="radio" name="card" value="0" checked="true" onclick="selectCard(this)" /></td>
                                        <td bgcolor="#ffffff" valign="top"><strong>不要贺卡</strong></td>
                                        <td bgcolor="#ffffff" valign="top" align="center">&nbsp;</td>
                                        <td bgcolor="#ffffff" valign="top" align="center">&nbsp;</td>
                                        <td bgcolor="#ffffff" valign="top" align="center">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td valign="top" bgcolor="#ffffff"><input type="radio" name="card" value="1" onclick="selectCard(this)" /></td>
                                        <td valign="top" bgcolor="#ffffff"><strong>祝福贺卡</strong></td>
                                        <td valign="top" align="center" bgcolor="#ffffff">5.00<em>元</em></td>
                                        <td valign="top" align="center" bgcolor="#ffffff">1000.00<em>元</em></td>
                                        <td valign="top" align="center" bgcolor="#ffffff">
                                            <a href="/static/data/cardimg/1242108754847457261.jpg" target="_blank" class="f6">查看</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff"></td>
                                        <td bgcolor="#ffffff" valign="top" colspan="4">
                                            <strong>祝福语:</strong>
                                            <textarea class="card_message" name="card_message" cols="80" rows="4" style="width:auto; border:1px solid #ccc;"></textarea>
                                        </td>
                                    </tr>
                                </table>
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
                                        <input class="btn btn--orange" type="button" value="提交订单" @click="orderDone" />
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
</div>
</template>

<script>
import '../../static/css/styAll.css'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
export default {
    name: 'orderList',
    components: {
        NavHeader,
        NavFooter
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
            shopMethod:''
        }
    },
    methods:{
        getCheckedGoods(){
            this.$https.post('/users/getCartList',{
                    userId:'100000077'
                }).then((res)=>{
                    console.log(res)
                    this.goodsList=res.data.data
                    this.getTotal();

                })
        },
        getAddrList(){
            this.$https.get('/users/getAddr',{
                params:{
                    userId:'100000077'
                }
            }).then(result=>{
                var res=result.data.data;
                
                res.forEach((item)=> {
                    if(item.isDefault){
                        this.address=item
                    }
                });
                
                
            })
        },
        getTotal(){
            console.log(this.goodsList)
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

            this.getType()
            this.$https.post('/users/addOrder',{
                    userId:'100000077',
                    addressId :this.address.addressId,
                    orderTotal :this.totalPrice,
                    payType :this.payType,
                    shopMethod : this.shopMethod,
                }).then((res)=>{
                    console.log(res)
                    this.$router.push({path:'/orderDone'})

                })
        },
        getType(){
            this.paymentType.forEach(function(item){
                if(item.checked){
                    this.payType=item.title
                }
            },this);
            this.shopMethods.forEach(function(item){
                if(item.checked){
                    this.shopMethod=item.title
                }
            },this)
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
