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
                                    <div class="checkout-item active">刘先生 北京</div>
                                    <span class="addr-name">刘先生</span>
                                    <span class="addr-info">北京 北京 海淀区 海兴大厦</span>
                                    <span class="addr-tel">010-25851234</span>
                                    <a href="flow.php?step=consignee" class="modify">修改</a>
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <h3 class="section-header"><span>支付方式</span></h3>
                                <div class="section-body">
                                    <ul class="item-list clearfix payment-list" id="payment-list">

                                        <li>
                                            <label class="checkout-item" for="payment_1">快钱人民币网关</label>
                                            <input type="radio" name="payment" class="radio" id="payment_1" value="5" isCod="0" onclick="selectPayment(this)" />
                                            <div class="text">
                                                <i></i>手续费：0.00<em>元</em> </div>
                                        </li>

                                        <li>
                                            <label class="checkout-item" for="payment_2">余额支付</label>
                                            <input type="radio" name="payment" class="radio" id="payment_2" value="1" isCod="0" onclick="selectPayment(this)" />
                                            <div class="text">
                                                <i></i>手续费：0.00<em>元</em> </div>
                                        </li>

                                        <li>
                                            <label class="checkout-item" for="payment_3">银行汇款/转帐</label>
                                            <input type="radio" name="payment" class="radio" id="payment_3" value="2" isCod="0" onclick="selectPayment(this)" />
                                            <div class="text">
                                                <i></i>手续费：0.00<em>元</em> </div>
                                        </li>

                                        <li>
                                            <label class="checkout-item" for="payment_4">货到付款</label>
                                            <input type="radio" name="payment" class="radio" id="payment_4" value="3" isCod="1" onclick="selectPayment(this)" disabled="true" />
                                            <div class="text">
                                                <i></i>手续费：<span id="ECS_CODFEE">0.00<em>元</em></span> </div>
                                        </li>

                                        <li>
                                            <label class="checkout-item" for="payment_5">网银在线</label>
                                            <input type="radio" name="payment" class="radio" id="payment_5" value="4" isCod="0" onclick="selectPayment(this)" />
                                            <div class="text">
                                                <i></i>手续费：1% </div>
                                        </li>

                                        <li>
                                            <label class="checkout-item" for="payment_6">支付宝</label>
                                            <input type="radio" name="payment" class="radio" id="payment_6" value="6" checked isCod="0" onclick="selectPayment(this)" />
                                            <div class="text">
                                                <i></i>手续费：0.00<em>元</em> </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="section-options clearfix section-shipping">
                                <h3 class="section-header"><span>配送方式</span></h3>
                                <div class="section-body">
                                    <ul class="item-list clearfix payment-list" id="shipping-list">
                                        <li>
                                            <label class="checkout-item" for="ECS_NEEDINSURE_1">申通快递</label>
                                            <input name="shipping" type="radio" id="ECS_NEEDINSURE_1" value="5" supportCod="0" insure="0" class="radio" onclick="selectShipping(this)" />
                                            <div class="text">
                                                <i></i>费用：15.00<em>元</em>&nbsp;&nbsp;免费额度：0.00<em>元</em> </div>
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="ECS_NEEDINSURE_2">城际快递</label>
                                            <input name="shipping" type="radio" id="ECS_NEEDINSURE_2" value="3" supportCod="1" insure="0" class="radio" onclick="selectShipping(this)" />
                                            <div class="text">
                                                <i></i>费用：10.00<em>元</em>&nbsp;&nbsp;免费额度：100000.00<em>元</em> </div>
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="ECS_NEEDINSURE_3">邮局平邮</label>
                                            <input name="shipping" type="radio" id="ECS_NEEDINSURE_3" value="6" supportCod="0" insure="0" class="radio" onclick="selectShipping(this)" />
                                            <div class="text">
                                                <i></i>费用：3.50<em>元</em>&nbsp;&nbsp;免费额度：50000.00<em>元</em> </div>
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="ECS_NEEDINSURE_4">中通速递</label>
                                            <input name="shipping" type="radio" id="ECS_NEEDINSURE_4" value="10" supportCod="0" insure="1%" class="radio" onclick="selectShipping(this)" />
                                            <div class="text">
                                                <i></i>费用：10.00<em>元</em>&nbsp;&nbsp;免费额度：0.00<em>元</em> </div>
                                        </li>
                                    </ul>
                                    <div style="margin-top:20px;">
                                        <label for="ECS_NEEDINSURE">
                    <input name="need_insure" id="ECS_NEEDINSURE" type="checkbox"  onclick="selectInsure(this.checked)" value="1"  disabled="true"  />
                    配送是否需要保价 
                    </label>
                                    </div>
                                </div>
                            </li>

                            <li class="section-options clearfix section-goods">
                                <div class="section-header clearfix">
                                    <h3 class="title">商品列表</h3>
                                    <a href="flow.php" class="modify">返回购物车<i class="iconfont"></i></a> </div>
                                <table width="100%" align="center" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd" class="goods-list-table">
                                    <tr>
                                        <td bgcolor="#ffffff">
                                            <img src="/static/images/201507/31_thumb_G_1437075539254.jpg" title="小米移动电源10000mAh" width="30" height="30" />

                                            <a href="goods.php?id=31" target="_blank" class="f6">小米移动电源10000mAh&nbsp;</a>


                                        </td>
                                        <td bgcolor="#ffffff" align="center">79.00<em>元</em>&nbsp;x&nbsp;2</td>
                                        <td bgcolor="#ffffff" align="center"><span style="color:#ff6700;">158.00<em>元</em></span></td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff">
                                            <img src="/static/images/201507/27_thumb_G_1437074702008.jpg" title="小米电视2 40英寸" width="30" height="30" />

                                            <a href="goods.php?id=27" target="_blank" class="f6">小米电视2 40英寸&nbsp;尺寸:45 
        颜色:黄[100] 
        </a>


                                        </td>
                                        <td bgcolor="#ffffff" align="center">2300.00<em>元</em>&nbsp;x&nbsp;1</td>
                                        <td bgcolor="#ffffff" align="center"><span style="color:#ff6700;">2300.00<em>元</em></span></td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff">
                                            <img src="/static/images/201507/45_thumb_G_1437092199733.jpg" title="小米活塞耳机标准版" width="30" height="30" />

                                            <a href="goods.php?id=45" target="_blank" class="f6">小米活塞耳机标准版&nbsp;</a>


                                        </td>
                                        <td bgcolor="#ffffff" align="center">89.00<em>元</em>&nbsp;x&nbsp;1</td>
                                        <td bgcolor="#ffffff" align="center"><span style="color:#ff6700;">89.00<em>元</em></span></td>
                                    </tr>

                                    <tr>
                                        <td bgcolor="#ffffff" colspan="7">
                                            购物金额小计 2547.00<em>元</em>，比市场价 3034.80<em>元</em> 节省了 487.80<em>元</em> (16%)</td>
                                    </tr>
                                </table>
                            </li>


                            <li class="section-options clearfix section-goods">
                                <h3 class="section-header"><span>祝福贺卡</span></h3>
                                <table width="100%" align="center" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd" id="cardTable" class="goods-list-table">
                                    <tr>
                                        <th bgcolor="#ffffff" width="5%" scope="col">&nbsp;</th>
                                        <th bgcolor="#ffffff" width="35%" scope="col">名称</th>
                                        <th bgcolor="#ffffff" width="22%" scope="col" align="center">价格</th>
                                        <th bgcolor="#ffffff" width="22%" scope="col" align="center">免费额度</th>
                                        <th bgcolor="#ffffff" scope="col" align="center">图片</th>
                                    </tr>
                                    <tr>
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
                                            <label class="checkout-item" for="how_oos_0" onclick="javascript:void(0);">等待所有商品备齐后再发</label>
                                            <input name="how_oos" id="how_oos_0" type="radio" value="0" class="radio" checked onclick="changeOOS(this)" />
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="how_oos_1" onclick="javascript:void(0);">取消订单</label>
                                            <input name="how_oos" id="how_oos_1" type="radio" value="1" class="radio" onclick="changeOOS(this)" />
                                        </li>
                                        <li>
                                            <label class="checkout-item" for="how_oos_2" onclick="javascript:void(0);">与店主协商</label>
                                            <input name="how_oos" id="how_oos_2" type="radio" value="2" class="radio" onclick="changeOOS(this)" />
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
            <font class="f4_b">2547</font> 积分            ，以及价值               <font class="f4_b">0.00<em>元</em></font>的红包。
          
        </span>
                                        </li>
                                        <li class="clearfix">
                                            <label>商品总价：</label><span class="val">2547.00<em>元</em></span>
                                        </li>
                                        <li class="clearfix total-price">
                                            <label>应付款金额：</label> <span class="val"><em>2547.00<em>元</em></em></span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="section-options clearfix" style="border-bottom:none;">
                                <div style="margin:8px auto; text-align:right;">
                                    <input type="image" src="/static/img/bnt_subOrder.gif" />
                                    <input type="hidden" name="step" value="done" />
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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
      NavHeader,
      NavFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
