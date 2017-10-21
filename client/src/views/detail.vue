<template>
<div>
    <nav-header></nav-header>
    <div class="goods-detail">
        <div class="goods-detail-info  clearfix J_goodsDetail">
            <div class="container">
                <div class="row">
                    <div class="span13  J_mi_goodsPic_block goods-detail-left-info">

                        <div class="goods-pic-box" id="detail_img">
                            <div class="goods-big-pic">
                                <a href="images/201507/goods_img/45_P_1437092199657.jpg" class="MagicZoomPlus" id="Zoomer" rel="hint-text: ; selectors-effect: false; selectors-class: current; zoom-distance: 60;zoom-width: 400; zoom-height: 400;">
                                    <img alt="格美活塞耳机标准版" src="http://mi.shudong.wang/images/201507/goods_img/45_P_1437092199657.jpg">
                                </a>
                            </div>
                            <div class="goods-small-pic" id="item-thumbs">
                                <a class="prev" href="javascript:void(0);"></a>
                                <a class="next" href="javascript:void(0);"></a>
                                <div class="bd">
                                    <ul class="cle">

                                        <li class="current">
                                            <a href="images/201507/goods_img/45_P_1437092199657.jpg" rel="zoom-id: Zoomer" rev="images/201507/goods_img/45_P_1437092199657.jpg">
                                                <img alt="格美活塞耳机标准版" src="http://mi.shudong.wang/images/201507/thumb_img/45_thumb_P_1437092199896.jpg">
                                            </a>
                                        </li>

                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="span7 goods-info-rightbox">
                        <form action="javascript:addToCart(45)" method="post" name="ECS_FORMBUY" id="ECS_FORMBUY">


                            <div class="goods-info-box" id="item-info">
                                <dl class="loaded">
                                    <dt class="goods-info-head">
                                    <dl>
                                        <dt class="goods-name">格美活塞耳机标准版</dt>
                                    <dd class="goods-phone-type">
                                        <p></p>
                                    </dd>
                                    <del>专柜价： <em class="cancel">107<em>元</em></em></del>
                                    <dd class="goods-info-head-price clearfix">

                                        <span>本店价：</span> <span class="unit"> <b class="nala_price red" id="ECS_SHOPPRICE">89<em>元</em> </b> </span>


                                        <a href="javascript:;" id="membership" data-type="normal" class="membership">高级会员购买享有折扣</a>
                                        <div class="membership_con">
                                            <div class="how-bd">
                                                <h3>会员价格</h3>
                                                <table width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50%">会员等级</td>
                                                            <td width="50%">会员价格</td>
                                                        </tr>
                                                        <tr id="ECS_RANKPRICE_1">
                                                            <td>注册用户</td>
                                                            <td>89<em>元</em></td>
                                                        </tr>
                                                        <tr id="ECS_RANKPRICE_2">
                                                            <td>vip</td>
                                                            <td>85<em>元</em></td>
                                                        </tr>
                                                        <tr id="ECS_RANKPRICE_99">
                                                            <td>微信用户</td>
                                                            <td>89<em>元</em></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>




                                    </dd>
                                    <dd>

                                        <ul>

                                            <li> <span class="lbl">商品货号</span> <em>ECS000045</em> </li>




                                            <li> <span class="lbl">商品库存</span> <em>10000 </em> </li>


                                            <li> <span class="lbl">上架时间：</span> <em>2015-07-17</em> </li>


                                            <li> <span class="lbl">商品重量</span> <em>0克</em> </li>





                                            <li><span>此商品可使用：<em class="red">0</em>积分</span></li>


                                        </ul>

                                    </dd>
                                    <dd class="goods-info-choose">


                                        <div id="choose" class="spec_list_box">

                                        </div>
                                        

                                        <ul class="sku">
                                            <li class="skunum_li clearfix">
                                                <div class="ghd">数量：</div>
                                                <div class="skunum gbd" id="skunum">
                                                    <span class="minus" title="减少1个数量"></span>
                                                    <input id="number" name="number" type="text" min="1" value="1" onchange="countNum(0)">
                                                    <span class="add" title="增加1个数量"></span>&nbsp;件
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>

                                    <dd class="goods-info-head-cart">
                                        <a href="javascript:addToCart(45)" class="btn  btn-primary goods-add-cart-btn" id="buy_btn"><i class="iconfont"></i>加入购物车</a>
                                    </dd>

                                </dl>
                                </dt>




                                </dl>
                            </div>
                        </form>
                        <div class="seemore_items" id="seemore_items" style="display:none;">
                            <h3>看了又看<a href="javascript:;" class="next refresh" title="换一组"><i class="iconfont"></i></a></h3>
                            <div class="bd">
                                <ul id="history_list">

                                    <li>
                                        <a href="goods.php?id=45" target="_blank" title="格美活塞耳机标准版"> <img alt="格美活塞耳机标准版" src="http://mi.shudong.wang/images/201507/thumb_img/45_thumb_G_1437092199733.jpg">
                                            <p class="price">89<em>元</em></p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <nav-footer></nav-footer>
</div>
</template>

<script>
import '../../static/css/index.css'
import '../../static/css/goods.css'
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
export default {
  name: 'detail',
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

                                            #choose {
                                                margin: 0;
                                            }
                                            
                                            #choose li {
                                                overflow: hidden;
                                                padding-bottom: 20px;
                                            }
                                            
                                            #choose .dt {
                                                width: 72px;
                                                text-align: left;
                                                float: left;
                                                padding: 6px 0 0;
                                            }
                                            
                                            #choose .dd {
                                                overflow: hidden;
                                            }
                                            
                                            #choose .dd .item {
                                                float: left;
                                                margin: 2px 8px 2px 0;
                                                position: relative;
                                            }
                                            
                                            #choose .dd .item a {
                                                border: 1px solid #ccc;
                                                padding: 4px 6px;
                                                float: left;
                                            }
                                            
                                            #choose .dd .item a span {
                                                padding: 0 3px;
                                                line-height: 30px;
                                            }
                                            
                                            #choose .dd .item a img {
                                                width: 30px;
                                                height: 30px;
                                            }
                                            
                                            #choose .dd .item b {
                                                width: 12px;
                                                height: 12px;
                                                /* background: url(themes/xiaomi/images/gou.png) no-repeat; */
                                                position: absolute;
                                                bottom: 1px;
                                                right: 1px;
                                                overflow: hidden;
                                                display: none;
                                            }
                                            
                                            #choose .dd .item.selected a {
                                                border-width: 2px;
                                                border-color: #e4393c;
                                                padding: 3px 5px;
                                            }
                                            
                                            #choose .dd .item.selected b {
                                                display: block;
                                            }
                                            
                                            #choose li.GeneralAttrImg .dt {
                                                padding-top: 10px;
                                            }
                                            
                                            #choose li.GeneralAttrImg .dd .item a {
                                                padding: 1px;
                                            }
                                            
                                            #choose li.GeneralAttrImg .dd .item a img {
                                                margin: 1px;
                                            }
                                            
                                            #choose li.GeneralAttrImg .dd .item.selected a {
                                                padding: 0;
                                            }
                                        
</style>
