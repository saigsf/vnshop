<template>
<div id="main" class="layout">
        <div class="nl-content">
            <div class="nl-logo-area">
                <a href="http://mi.shudong.wang/"><img src="/static/img/vn-logo.png" width="260"></a>
            </div>
            <h1 class="nl-login-title">一个帐号，玩转所有格美官网服务！</h1>
            <p class="nl-login-intro"></p>
            <div id="login-box" class="nl-frame-container">
                <div class="ng-form-area show-place">
                    <form name="formLogin" action="http://mi.shudong.wang/user.php" method="post" onsubmit="return userLogin()">
                        <div class="shake-area">
                            <div class="enter-area">
                                <input name="username" type="text" class="enter-item first-enter-item" placeholder="用户名" v-model="userName" >
                                <i class="placeholder">用户名</i>
                            </div>
                            <div class="enter-area">
                                <input name="password" type="password" class="enter-item last-enter-item" placeholder="密码" v-model="userPwd" >
                                <i class="placeholder">密码</i>
                            </div>
                        </div>
                        <div class="enter-area img-code-area">
                            <img src="http://mi.shudong.wang/captcha.php?is_login=1&amp;1592819267" alt="captcha" class="code-img" onclick="this.src='captcha.php?is_login=1&amp;'+Math.random()">
                            <input type="text" class="enter-item code-enter-item" name="captcha" maxlength="6" placeholder="验证码">
                            <i class="placeholder">验证码</i>
                        </div>
                        <input type="hidden" name="act" value="act_login">
                        <input type="hidden" name="back_act" value="http://mi.shudong.wang/">
                        <input type="button" name="submit" class="button orange" value="立即登录" @click="login" >
                        <div class="ng-foot clearfix">
                            <div class="ng-cookie-area"><label><input type="checkbox" value="1" name="remember" id="remember" class="remember-me">请保存我这次的登录信息。</label></div>
                            <div class="ng-link-area">
                                <span><a href="javascript:void(0)" id="other_method">其它登录方式</a><span> | </span></span>
                                <span><a href="http://mi.shudong.wang/user.php?act=get_password">忘记密码?</a></span>
                                <div class="third-area hide">
                                    <a class="ta-weibo" target="_blank" href="http://mi.shudong.wang/user.php?act=oath&amp;type=weibo" title="weibo">weibo</a>
                                    <a class="ta-qq" target="_blank" href="http://mi.shudong.wang/user.php?act=oath&amp;type=qq" title="qq">qq</a>
                                    <a class="ta-alipay" target="_blank" href="http://mi.shudong.wang/user.php?act=oath&amp;type=alipay" title="alipay">alipay</a>
                                    <em class="corner"></em>
                                    <em class="corner-inner"></em>
                                </div>
                            </div>
                        </div>
                        <router-link to="/register" class="button" >注册格美官网账号</router-link>
                    </form>
                </div>
            </div>
        </div>
        <div class="nl-footer">
            <div class="nl-f-nav">
                <span>
                </span>
            </div>
            <p class="nl-f-copyright">©<a href="http://mi.shudong.wang/user.php#">vnshop.cn</a> 京ICP证110507号 京ICP备10046444号 京公网安备1101080212535号 <a href="http://mi.shudong.wang/user.php#">京网文[2014]0059-0009号</a></p>
        </div>
    </div>
</template>

<script>
import '../../static/css/login.css'
import {encode } from '../util/util.js'
export default {
  name: 'Login',
  data () {
    return {
      userName:'',
      userPwd:''
    }
  },
  methods:{

      login(){
          this.$https.post('/users/login',{
              userName:this.userName,
              userPwd:encode(this.userPwd)
          }).then(res=>{
              if(res.data.code===0){
                  this.$router.push({path:'/'})
              }
              
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
