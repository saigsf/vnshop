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
                        <dd><a @click="setPriceChecked('all')" :class="{'cur':priceChecked==='all'}" href="javascript:void(0)" >All</a></dd>
                        <dd v-for="(item,index) in priceFilter" :key="index" >
                            <a @click="setPriceChecked(index)" :class="{'cur':priceChecked===index}"  href="javascript:void(0)">{{item.startPrice}} - {{item.endPrice}}</a>
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
                                    <div class="btn-area"  >
                                        <a @click="addCart(item)"   href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                        <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
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
                priceChecked:'all',
                priceFilter:[
                    {
                        startPrice:0,
                        endPrice:100
                    },{
                        startPrice:100,
                        endPrice:500
                    },{
                        startPrice:500,
                        endPrice:1000
                    },{
                        startPrice:1000,
                        endPrice:2000
                    }
                ],
                data: [],
                busy: true,
                page:1,
                pageSize:4
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
            getGoods(flag){
                let sort=this.isSort?1:-1;
                if(!flag){
                    this.page=1;
                }
                let param={
                    sort:sort,
                    priceLevel:this.priceChecked,
                    page:this.page,
                    pageSize:this.pageSize
                };
                this.$https.get("/goods/list",{params:param})
                    .then(res=>{
                        if(flag){
                            this.goodsList=this.goodsList.concat(res.data.data);
                            if(res.data.data.length==0){
                                this.busy=true;
                            }else{
                                this.busy=false;
                                
                            }
                        }else{
                            this.goodsList=res.data.data;
                            this.busy=false;
                        }
                    })
            },
            getSort(){
                this.isSort=!this.isSort;
                this.getGoods();
            },
            setPriceChecked(index){
                this.priceChecked=index;
                this.getGoods();
            },
            loadMore() {
                this.busy = true;
                setTimeout(()=>{
                    this.page++;
                    this.getGoods(true);
                }, 1000);
            },
            addCart(item){
                this.$https.post('/users/addCart',{
                    userId:'100000077',
                    productId:item.productId,
                    productNum:1
                }).then((res)=>{
                    
                    if(res.data.status===0){
                        alert("恭喜，添加购物车成功！")
                    }
                })
            }

        }
    }
</script>
<style >

</style>
