<template>
<div>
    <nav-header/>
    <nav-crumbs>
        <span>goods</span>
    </nav-crumbs>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)">All</a></dd>
                        <dd>
                            <a href="javascript:void(0)">0 - 100</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">100 - 500</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">500 - 1000</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)">1000 - 2000</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,idx) in goodsList" :key="idx" >
                                <div class="pic">
                                    <a href="#"><img :src="'static/img/'+item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav-footer/>

</div>
</template>
<script>
    import '../../static/css/product.css'
    
    import NavHeader from '../components/NavHeader'
    import NavFooter from '../components/NavFooter'
    import NavCrumbs from '../components/NavCrumbs'
    export default{
        name: 'GoodsList',
        data:{
            goodsList:[] ,

        },
        components: {
            NavHeader,
            NavFooter,
            NavCrumbs
        },
        created () {
          this.getGoods(); 
        },
        methods: {
            getGoods(){
                this.$https.get('http://localhost:8080/goods').then(res=>{
                    this.goodsList=res.data.data;
                    console.log(res.data.data)
                })
            }
        }
    }
</script>
<style>

</style>
