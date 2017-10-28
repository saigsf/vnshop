<template>
    <div class="register_wrap">
        <div class="bugfix_ie6 dis_none">
            <div class="n-logo-area clearfix">
                <!-- <a href="http://mi.shudong.wang/" class="fl-l"><img src="/static/img/vn-logo.png" width="260"></a> -->
                <router-link to="/" class="fl-l"><img src="/static/img/vn-logo.png" width="260"></router-link>
            </div>
        </div>
        <div id="main">
            <div class="n-frame device-frame reg_frame">

                <div class="title-item dis_bot35 t_c">
                    <h4 class="title-big">注册格美官网帐号 </h4>
                </div>
                <div class="regbox" id="register_box">
                    
                    <form  name="formUser">
                        <input type="hidden" value="C4E1AB9A7DE79D7C750E8916875E7DBE" id="validate">
                        <div class="phone_step1">
                            <input type="hidden" id="sendtype">

                            <div class="inputbg">
                                <label class="labelbox">
                                    <input type="text" v-model="userName" name="un" id="username"  @blur="is_registered();" placeholder="用户名,2-15位数字字母_汉字">
                                </label>
                                <span class="error_icon" v-for="(item,idx) in nameStatus" :key="idx" v-if="item.name==nameConfirm" :class="{'green':item.name=='ok','red':item.name!='ok'}" >{{item.tips}} </span>
                            </div>
                            <div class="err_tip" id="username_notice"> <em></em> </div>

                            <div class="inputbg">
                                <label class="labelbox">
                                    <input v-model="email" type="text" id="email" @blur="checkEmail();" placeholder="email">
                                    
                                </label>
                                <span class="error_icon" v-for="(item,idx) in emailStatus" :key="idx" v-if="item.name==emailConfirm" :class="{'green':item.name=='ok','red':item.name!='ok'}" >{{item.tips}} </span>
                            </div>
                            <div class="err_tip" id="email_notice"><em></em> </div>

                            <div class="inputbg">
                                <label class="labelbox">
                                    <input type="password" v-model="userPwd" id="password1"  @blur="check_password();" placeholder="密码,6-16位数字字母组合">
                                </label>
                                <span class="error_icon" v-for="(item,idx) in userPwdStatus" :key="idx" v-if="item.name==userPwdConfirm" :class="{'green':item.name=='ok','red':item.name!='ok'}" >{{item.tips}} </span>
                            </div>
                            <div class="err_tip" id="password_notice"> <em></em> </div>

                            <div class="inputbg">
                                <label class="labelbox">
                                    <input v-model="rePwd" type="password" id="conform_password"  @blur="check_conform_password();" placeholder="确认密码">
                                </label>
                                <span class="error_icon" v-for="(item,idx) in rePwdStatus" :key="idx" v-if="item.name==rePwdConfirm" :class="{'green':item.name=='ok','red':item.name!='ok'}" >{{item.tips}} </span>
                            </div>
                            <div class="err_tip" id="conform_password_notice"> <em></em> </div>



                            <div class="inputbg inputcode dis_box clearfix">
                                <label class="labelbox label-code">
                                    <input type="text" class="code" name="captcha" maxlength="6" placeholder="验证码">
                                </label>
                                <span class="t_text">验证码</span>
                                <span class="error_icon"></span>
                                <img src="http://mi.shudong.wang/captcha.php?148237837" alt="captcha" class="icode_image code-image chkcode_img" onclick="this.src='captcha.php?'+Math.random()">
                            </div>
                            <div class="err_tip"> <em></em> </div>
                            <div class="law">
                                <label>
                                    <input name="agreement" type="checkbox" value="1" checked="checked" tabindex="5" class="remember-me">
                                    我已看过并接受《<a href="http://mi.shudong.wang/article.php?cat_id=-1" style="color:blue" target="_blank">用户协议</a>》
                                </label>
                            </div>
                            <div class="err_tip"> <em></em> </div>
                            <div class="fixed_bot mar_phone_dis1">
                                <input name="act" type="hidden" value="act_register">
                                <input type="hidden" name="back_act" value="">
                                <input name="Submit" type="button" value="同意协议并注册" class="btn332 btn_reg_1 submit-step" @click="okRegister" >
                            </div>
                            <div class="trig">已有账号? 
                                <router-link  to="/login" class="trigger-box">点击登录</router-link> 
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="n-footer">
            <div class="nl-f-nav">
                <span>
                        </span>
            </div>
            <p class="nf-intro"><span>©<a href="http://mi.shudong.wang/user.php?act=register#">vnshop.cn</a> 京ICP证110507号 京ICP备10046444号 京公网安备1101080212535号 <a href="http://mi.shudong.wang/user.php?act=register#">京网文[2014]0059-0009号</a></span></p>
        </div>
    </div>
</template>

<script>
import "../../static/css/login.css";
import {encode} from '../util/util.js'
export default {
  name: "Register",
  data() {
    return {
        userName:'',
        nameConfirm:'',
        nameStatus:[{
            name: "default",
            tips: ""
        }, {
            name: "required",
            tips: "账号不能为空！"
        }, {
            name: "pattern",
            tips: "2-15位数字字母_汉字"
        }, {
            name: "repeat",
            tips: "用户名已存在"
        }, {
            name: "ok",
            tips: "√"
        }],
        email:'',
        emailConfirm:'',
        emailStatus:[{
            name: "default",
            tips: ""
        }, {
            name: "required",
            tips: "邮箱不能为空！"
        }, {
            name: "pattern",
            tips: "邮箱格式不合法"
        },{
            name: "ok",
            tips: "√"
        }],
        userPwd:'',
        userPwdConfirm:'',
        userPwdStatus:[{
            name: "default",
            tips: ""
        }, {
            name: "required",
            tips: "密码不能为空！"
        }, {
            name: "pattern",
            tips: "密码不合法，6-16位数字字母组合"
        },{
            name: "ok",
            tips: "√"
        }],
        rePwd:'',
        rePwdConfirm:'',
        rePwdStatus:[{
            name: "default",
            tips: ""
        }, {
            name: "required",
            tips: "密码不能为空！"
        }, {
            name: "equal",
            tips: "密码不一致"
        },{
            name: "ok",
            tips: "√"
        }],
        
    };
  },
  methods:{
      is_registered(){
        var userName_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
        this.$https.post('/users/getUserList',{userName:this.userName}).then((res)=>{
                    if(res.data.data!=0){
                        this.nameConfirm='repeat'
                    }else if(!this.userName){
                        this.nameConfirm='required'
                    }else if(!userName_REGEXP.test(this.userName)){
                        this.nameConfirm='pattern'
                    }else{
                        this.nameConfirm='ok'
                    }
                    
                })
    
      },
      check_password(){
        var userPwd_REGEXP = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(!this.userPwd){
            this.userPwdConfirm='required'
        }else if(!userPwd_REGEXP.test(this.userPwd)){
            this.userPwdConfirm='pattern'
        }else{
            this.userPwdConfirm='ok'
        }
      },
      check_conform_password(){
        if(!this.rePwd){
            this.rePwdConfirm='required'
        }else if(this.rePwd!==this.userPwd){
            this.rePwdConfirm='equal'
        }else{
            this.rePwdConfirm='ok'
        }
      },
      
      checkEmail(){
        var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(!this.email){
            this.emailConfirm='required'
        }else if(!EMAIL_REGEXP.test(this.email)){
            this.emailConfirm='pattern'
        }else{
            this.emailConfirm='ok'
        }
      },
      okRegister(){
          this.$https.post('/users/register',{
              userName:this.userName,
              userPwd:encode(this.userPwd),
              email:this.email
          }).then(res=>{
            console.log(res)
            if(res.data.code==0){
                this.$router.push({path:'/login'})
            }
            
          },err=>{
              console.log(err)
          })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: none;
}
.red{
    display: block;
    color: red;
}
.green{
    display: inline-block;
    background-color: green;
    color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    text-align: center;
    line-height: 16px
}
</style>
