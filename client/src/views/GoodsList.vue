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
                <a href="javascript:void(0)" class="price" @click="getSort" >Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" @click="getLimitPrice()">All</a></dd>
                        <dd>
                            <a href="javascript:void(0)" @click="getLimitPrice({min:0,max:100})">0 - 100</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)" @click="getLimitPrice({min:100,max:500})">100 - 500</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)" @click="getLimitPrice({min:500,max:1000})">500 - 1000</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)" @click="getLimitPrice({min:1000,max:2000})" >1000 - 2000</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="item in goodsList" :key="item.id" >
                                <div class="pic">
                                    <a href="#"><img v-lazy="'static/img/'+item.productImage" alt=""></a>
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
        data(){
            return {
                goodsList:[],
                isSort:true,
                limitPrice:{
                    min:0,
                    max:10000
                }
            }
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
                let sort=this.isSort?1:-1;
                let minPrice=this.limitPrice.min;
                let maxPrice=this.limitPrice.max;
                let data="?sort="+sort+"&minPrice="+minPrice+"&maxPrice="+maxPrice ;
                this.$https.get("/goods/list"+data).then(res=>{
                    this.goodsList=res.data.data;
                    console.log(res)
                })
            },
            getSort(){
                this.isSort=!this.isSort;
                this.getGoods();
            },
            getLimitPrice(limit){
                this.limitPrice=limit?limit:{
                    min:0,
                    max:10000
                };
                this.getGoods();
            }

        }
    }
</script>
<style>

</style>
