<template>
<div>
    <nav-header></nav-header>
    <div class="page-main" id="cart-box">
        <div class="container">
            <div class="cart-goods-list">
                <div class="list-head clearfix">
                    <div class="col col-img" id="itemsnum-top">图片</div>
                    <div class="col col-name">商品名称</div>
                    <div class="col col-price">单价</div>
                    <div class="col col-num">数量</div>
                    <div class="col col-total">小计</div>
                    <div class="col col-action">操作</div>
                </div>
                <div class="list-body">

                    <div class="item-box">
                        <div class="item-table">
                            <div class="item-row clearfix">


                                <div class="col col-img">
                                    <a href="goods.php?id=27" target="_blank"> <img alt="小米电视2 40英寸" src="/static/images/201507/27_thumb_G_1437074702008.jpg"></a>
                                </div>
                                <div class="col col-name">
                                    <h3 class="name"><a href="goods.php?id=27" target="_blank">小米电视2 40英寸 </a></h3>
                                    <p class="desc">

                                        <span>尺寸:45 
        颜色:黄[100] 
        </span>


                                        </a>
                                    </p>
                                </div>

                                <div class="col col-price">
                                    2300.00<em>元</em> </div>
                                <div class="col col-num">
                                    <div class="change-goods-num clearfix">
                                        <a href="javascript:void(0)" class="minus" title="减少1个数量" onclick="flowClickCartNum(14,-1);"><i class="iconfont"></i></a>
                                        <input type="text" id="goods_number_14" value="1" onchange="flowClickCartNum(14,0)">
                                        <a href="javascript:void(0)" class="add" title="增加1个数量" onclick="flowClickCartNum(14,+1);"><i class="iconfont"></i></a>
                                    </div>
                                </div>
                                <div class="col col-total"><span id="total_items_14">2300.00<em>元</em></span></div>
                                <div class="col col-action">
                                    <a class="del" href="javascript:if (confirm('您确实要把该商品移出购物车吗？')) location.href='flow.php?step=drop_goods&amp;id=14';"><i class="iconfont"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item-table">
                            <div class="item-row clearfix">


                                <div class="col col-img">
                                    <a href="goods.php?id=31" target="_blank"> <img alt="小米移动电源10000mAh" src="/static/images/201507/31_thumb_G_1437075539254.jpg"></a>
                                </div>
                                <div class="col col-name">
                                    <h3 class="name"><a href="goods.php?id=31" target="_blank">小米移动电源10000mAh </a></h3>
                                    <p class="desc">

                                        <span></span>


                                        </a>
                                    </p>
                                </div>

                                <div class="col col-price">
                                    79.00<em>元</em> </div>
                                <div class="col col-num">
                                    <div class="change-goods-num clearfix">
                                        <a href="javascript:void(0)" class="minus" title="减少1个数量" onclick="flowClickCartNum(13,-1);"><i class="iconfont"></i></a>
                                        <input type="text" id="goods_number_13" value="2" onchange="flowClickCartNum(13,0)">
                                        <a href="javascript:void(0)" class="add" title="增加1个数量" onclick="flowClickCartNum(13,+1);"><i class="iconfont"></i></a>
                                    </div>
                                </div>
                                <div class="col col-total"><span id="total_items_13">158.00<em>元</em></span></div>
                                <div class="col col-action">
                                    <a class="del" href="javascript:if (confirm('您确实要把该商品移出购物车吗？')) location.href='flow.php?step=drop_goods&amp;id=13';"><i class="iconfont"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item-table">
                            <div class="item-row clearfix">


                                <div class="col col-img">
                                    <a href="goods.php?id=45" target="_blank"> <img alt="小米活塞耳机标准版" src="/static/images/201507/45_thumb_G_1437092199733.jpg"></a>
                                </div>
                                <div class="col col-name">
                                    <h3 class="name"><a href="goods.php?id=45" target="_blank">小米活塞耳机标准版 </a></h3>
                                    <p class="desc">

                                        <span></span>


                                        </a>
                                    </p>
                                </div>

                                <div class="col col-price">
                                    89.00<em>元</em> </div>
                                <div class="col col-num">
                                    <div class="change-goods-num clearfix">
                                        <a href="javascript:void(0)" class="minus" title="减少1个数量" onclick="flowClickCartNum(15,-1);"><i class="iconfont"></i></a>
                                        <input type="text" id="goods_number_15" value="1" onchange="flowClickCartNum(15,0)">
                                        <a href="javascript:void(0)" class="add" title="增加1个数量" onclick="flowClickCartNum(15,+1);"><i class="iconfont"></i></a>
                                    </div>
                                </div>
                                <div class="col col-total"><span id="total_items_15">89.00<em>元</em></span></div>
                                <div class="col col-action">
                                    <a class="del" href="javascript:if (confirm('您确实要把该商品移出购物车吗？')) location.href='flow.php?step=drop_goods&amp;id=15';"><i class="iconfont"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="clear-cart"> <a id="del-all" href="flow.php?step=clear">清空购物车</a> </p>

                <div class="cart-bar clearfix">
                    <div class="section-left">
                        <a class="back-shopping btn btn-gray" href="./">继续购物</a>
                    </div>
                    <span class="total-price"><span class="total-num"></span>&nbsp;&nbsp;&nbsp;合计：<b id="totalSkuPrice">2547.00<em>元</em></b></span>
                    <a href="flow.php?step=checkout" class="btn btn-pay btn-primary">去结算</a>
                </div>
            </div>
        </div>
    </div>

    <div class="cart-recommend" id="page-btm">
        <div class="container">
            <h2 class="xm-recommend-title"><span>商品相关配件</span></h2>
            <form action="flow.php" method="post">
                <div class="xm-recommend">
                    <ul class="row">
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=31" target="_blank">
                            <img alt="" src="/static/images/201507/31_thumb_G_1437075539254.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=31" target="_blank">小米移动电源10000mAh</a></dd>
                                <dd class="xm-recommend-price">60<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(31,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=32" target="_blank">
                            <img alt="" src="/static/images/201507/32_thumb_G_1437075765802.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=32" target="_blank">小米路由器 mini</a></dd>
                                <dd class="xm-recommend-price">120<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(32,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=33" target="_blank">
                            <img alt="" src="/static/images/201507/33_thumb_G_1437075865379.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=33" target="_blank">小蚁智能摄像机 标准</a></dd>
                                <dd class="xm-recommend-price">119<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(33,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=34" target="_blank">
                            <img alt="" src="/static/images/201507/34_thumb_G_1437076036973.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=34" target="_blank">小蚁运动相机</a></dd>
                                <dd class="xm-recommend-price">299<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(34,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=35" target="_blank">
                            <img alt="" src="/static/images/201507/35_thumb_G_1437081702649.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=35" target="_blank">小米空气净化器</a></dd>
                                <dd class="xm-recommend-price">799<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(35,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=36" target="_blank">
                            <img alt="" src="/static/images/201507/36_thumb_G_1437082145888.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=36" target="_blank">iHealth智能血压计</a></dd>
                                <dd class="xm-recommend-price">129<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(36,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=37" target="_blank">
                            <img alt="" src="/static/images/201507/37_thumb_G_1437082214575.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=37" target="_blank">小米智能插座</a></dd>
                                <dd class="xm-recommend-price">49<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(37,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=44" target="_blank">
                            <img alt="" src="/static/images/201507/44_thumb_G_1437092148601.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=44" target="_blank">小米移动电源5000mAh</a></dd>
                                <dd class="xm-recommend-price">40<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(44,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=67" target="_blank">
                            <img alt="" src="/static/images/201508/67_thumb_G_1440983638116.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=67" target="_blank">小米手环</a></dd>
                                <dd class="xm-recommend-price">50<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(67,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=73" target="_blank">
                            <img alt="" src="/static/images/201508/73_thumb_G_1440983937959.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=73" target="_blank">刀锋移动电源</a></dd>
                                <dd class="xm-recommend-price">200<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(73,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>
                        <li class="span4">
                            <dl>
                                <dt>
                        <a href="goods.php?id=75" target="_blank">
                            <img alt="" src="/static/images/201508/75_thumb_G_1440984011595.jpg" style="display: inline;">
                        </a>
                      </dt>
                                <dd class="xm-recommend-name"><a href="goods.php?id=75" target="_blank">多彩电源适配器</a></dd>
                                <dd class="xm-recommend-price">16<em>元</em></dd>
                                <dd class="xm-recommend-tips">
                                    <a href="javascript:fittings_to_flow(75,27)" class="btn btn-small btn-line-primary" id="add-cart">放入购物车</a>
                                </dd>
                            </dl>
                        </li>

                    </ul>
                </div>
            </form>
        </div>
    </div>
    <nav-footer></nav-footer>
</div>
</template>

<script>
import '../../static/css/styAll.css'

import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
// import NavCrumbs from '/static/components/NavCrumbs'
export default {

  name: 'shopList',
  components: {
        NavHeader,
        NavFooter
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
