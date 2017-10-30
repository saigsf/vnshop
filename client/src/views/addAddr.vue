<template>
<div>
    <nav-header ref="child"></nav-header>
    <nav-crumbs>添加地址</nav-crumbs>
    <div class="cle cart_main">
        
        <div class="page-main">

            <div class="container">
                <form action="flow.php" method="post" name="theForm" id="theForm" onsubmit="return checkConsignee(this)">
                    <div class="checkout-box">

                        <h2 class="aui_title" style="cursor: move;">收货人信息</h2>

                        <ul class="box-main clearfix" id="addr-form">

                            <li class="section-options clearfix">
                                <label class="section-header">配送区域:</label>
                                <div class="section-body section-address">
                                    <div class="dropdown">
                                        <label class="iconfont"></label>
                                        <select v-model="address.country" id="selCountries_0" class="input-select">
                                            <option disabled  value="">请选择国家</option>
                                            <option value="中国" >中国</option>
                                        </select>
                                    </div>
                                    <div class="dropdown">
                                        <label class="iconfont"></label>
                                        <select v-model="address.province" id="selProvinces_0" class="input-select">
                                                <option disabled value="">请选择省</option>
                                                <option value="2"  >北京</option>
                                                <option value="3" >安徽</option>
                                                <option value="4" >福建</option>
                                                <option value="5" >甘肃</option>
                                                <option value="6" >广东</option>
                                                <option value="7" >广西</option>
                                                <option value="8" >贵州</option>
                                                <option value="9" >海南</option>
                                                <option value="10" >河北</option>
                                                <option value="11" >河南</option>
                                                <option value="12" >黑龙江</option>
                                                <option value="13" >湖北</option>
                                                <option value="14" >湖南</option>
                                                <option value="15" >吉林</option>
                                                <option value="16" >江苏</option>
                                                <option value="17" >江西</option>
                                                <option value="18" >辽宁</option>
                                                <option value="19" >内蒙古</option>
                                                <option value="20" >宁夏</option>
                                                <option value="21" >青海</option>
                                                <option value="22" >山东</option>
                                                <option value="23" >山西</option>
                                                <option value="24" >陕西</option>
                                                <option value="25" >上海</option>
                                                <option value="26" >四川</option>
                                                <option value="27" >天津</option>
                                                <option value="28" >西藏</option>
                                                <option value="29" >新疆</option>
                                                <option value="30" >云南</option>
                                                <option value="31" >浙江</option>
                                                <option value="32" >重庆</option>
                                                <option value="33" >香港</option>
                                                <option value="34" >澳门</option>
                                                <option value="35" >台湾</option>
                                              </select>
                                    </div>
                                    <div class="dropdown">
                                        <label class="iconfont"></label>
                                        <select v-model="address.city" id="selCities_0" class="input-select">
                                            <option disabled value="">请选择市</option>
                                        </select>
                                    </div>
                                    <div class="dropdown">
                                        <label class="iconfont"></label>
                                        <select v-model="address.district" id="selDistricts_0" class="input-select">
                                            <option disabled value="">请选择区</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header"><em>*</em>收货人姓名</label>
                                <div class="section-body">
                                    <input  v-model="address.userName" type="text" class="input-text" id="consignee_0"  />
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header"><em>*</em>电子邮件地址</label>
                                <div class="section-body">
                                    <input  v-model="address.Email" type="text" class="input-text" id="email_0" />
                                </div>
                            </li>



                            <li class="section-options clearfix">
                                <label class="section-header"><em>*</em>详细地址</label>
                                <div class="section-body">
                                    <input  v-model="address.streetName" type="text" class="input-text" id="address_0"  />
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header">邮政编码</label>
                                <div class="section-body">
                                    <input  v-model="address.postCode" type="text" class="input-text" id="zipcode_0" />
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header"><em>*</em>电话</label>
                                <div class="section-body">
                                    <input v-model="address.tel" type="text" class="input-text" id="tel_0" />
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header">手机</label>
                                <div class="section-body">
                                    <input v-model="address.mobile" type="text" class="input-text" id="mobile_0"  />
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header">标志建筑</label>
                                <div class="section-body">
                                    <input v-model="address.sign_building" type="text" class="input-text" id="sign_building_0" />
                                </div>
                            </li>
                            <li class="section-options clearfix">
                                <label class="section-header">最佳送货时间</label>
                                <div class="section-body">
                                    <input v-model="address.best_time" type="text" class="input-text" id="best_time_0" value="" />
                                </div>
                            </li>
                        </ul>


                        <div class="form-confirm clearfix">
                            <input type="button" name="Submit" class="btn btn-primary" @click="add"  value="配送至这个地址" />
                            <input type="hidden" name="step" value="consignee" />
                            <input type="hidden" name="act" value="checkout" />
                            <input name="address_id" type="hidden" value="" />
                        </div>
                    </div>
                </form>
            </div>


        </div>
    </div>
</div>
</template>

<script>
import '../../static/css/styAll.css'

import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import NavCrumbs from '../components/NavCrumbs'
import Modal from '../components/Modal'
export default {
    name: 'address',
    components: {
        NavHeader,
        NavFooter,
        NavCrumbs,
        Modal
    },
    data () {
        return {
            address :{
                postCode: '',
                streetName: '',
                tel: '',
                mobile:'',
                userName: '',
                Email:'',
                sign_building:'',
                best_time:'',
                country:'',
                province:'',
                city:'',
                district:''
            }

        }
    },
    created () {
        
    },
    methods: {
        add(){
            // console.log(this.address)
            this.$https.post('/users/addAddr',{
                address:this.address
            }).then(res=>{
                // console.log(res)
                if(res.data.code===0){
                     this.$router.push({path:'/address'})
                }else{
                    this.$refs.child.isError()
                }
               
            })
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

                                        
</style>
