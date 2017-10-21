<template>
<div>
    <nav-header></nav-header>
    <div class="form-wrap container clearfix">
        <div class="form-box fl" id="login-box">
            <div class="form-hd clearfix">
                <div class="trig">没有帐号？<a href="user.php?act=register" class="trigger-box">点击注册</a></div>
                <h2>登录</h2>
            </div>
            <div class="form-bd" style="height:auto;">
                <form action="flow.php?step=login" method="post" name="loginForm" id="loginForm" onsubmit="return checkLoginForm(this)">
                    <ul class="form-list clearfix">
                        <li class="text_input"><span class="error_icon"></span><span class="icon icon-user"></span>
                            <input name="username" type="text" class="text" placeholder="用户名" />
                        </li>
                        <li class="text_input"><span class="error_icon"></span><span class="icon icon-pwd"></span>
                            <input name="password" type="password" class="text" placeholder="密码" />
                        </li>
                        <li class="security_code input_box"> <span class="t_text">验证码</span>
                            <input type="text" class="code_input" name="captcha" maxlength="6">
                            <span class="error_icon"></span> <img src="captcha.php?is_login=1&1176989653" alt="captcha" style="vertical-align: middle;cursor: pointer;" onClick="this.src='captcha.php?is_login=1&'+Math.random()" /></li>
                        <div class="blank" style="height:20px;"> </div>

                        <li class="login_param">
                            <p><a class="forget_psd" href="user.php?act=get_password">忘记密码?</a>
                                <label>
                      <input type="checkbox" value="1" name="remember" id="remember" class="remember-me">
                      请保存我这次的登录信息。</label>
                            </p>
                        </li>
                        <li class="last" style="margin-bottom:0;">
                            <input type="submit" name="submit" class="btn" value="登 录">
                            <input name="act" type="hidden" value="signin" />
                        </li>
                        <li class="last">

                            <input type="button" class="btn" value="不打算登录，直接购买" onclick="location.href='flow.php?step=consignee&amp;direct_shopping=1'" />


                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div class="form-box fr">
            <div id="register_box">
                <form action="flow.php?step=login" method="post" name="formUser" id="registerForm" onsubmit="return checkSignupForm(this)">
                    <h2>
                        <div class="trig">已有账号? <a href="user.php" class="trigger-box">点击登录</a> </div>
                        注册 </h2>
                    <div class="register_infor">
                        <input type="hidden" id="sendtype">
                        <ul>
                            <li class="input_box"> <span class="t_text">用户名</span>
                                <input type="text" name="username" id="username" onblur="is_registered(this.value);" onkeyup="is_registered(this.value);">
                                <span class="error_icon"></span> </li>
                            <li class="error_box" id="username_notice"> <em></em> </li>
                            <li class="input_box"> <span class="t_text">email</span>
                                <input name="email" type="text" id="email" onblur="checkEmail(this.value);" onkeyup="checkEmail(this.value);">
                                <span class="error_icon"></span> </li>
                            <li class="error_box" id="email_notice"><em></em> </li>
                            <li class="input_box"> <span class="t_text">密码</span>
                                <input type="password" name="password" id="password1" onblur="check_password(this.value);" onkeyup="check_password(this.value);checkIntensity(this.value);">
                                <span class="error_icon"></span> </li>
                            <li class="error_box" id="password_notice"> <em></em> </li>
                            <li class="input_box"> <span class="t_text">确认密码</span>
                                <input name="confirm_password" type="password" id="conform_password" onblur="check_conform_password(this.value);" onkeyup="check_conform_password(this.value);">
                                <span class="error_icon"></span> </li>
                            <li class="error_box" id="conform_password_notice"> <em></em> </li>



                            <li class="security_code input_box"> <span class="t_text">验证码</span>
                                <input type="text" class="code_input" name="captcha" maxlength="6">
                                <span class="error_icon"></span> <img src="captcha.php?1176989653" /> </li>
                            <li class="error_box"> <em></em> </li>
                            <li class="lizi_law">
                                <label>
                <input name="agreement" type="checkbox" value="1" checked="checked"  tabindex="5" class="remember-me"/>
                我已看过并接受《<a href="article.php?cat_id=-1" style="color:blue" target="_blank">用户协议</a>》</label>
                            </li>
                            <li class="error_box"> <em></em> </li>
                            <li class="go2register">
                                <input type="submit" name="Submit" class="btn submit_btn" value="注册新用户" />
                                <input name="act" type="hidden" value="signup" />
                            </li>
                        </ul>
                    </div>
                </form>
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
  name: 'RegisterLogin',
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
