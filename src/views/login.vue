<template>
<div class="login" v-iscroll="">
  <div class="scoll-layer special-height">
    <div class="logo">
    </div>
    <div class="ipt_box">
      <input type="tel" v-model="loginModel.phone" class="ipt_username" maxLength="11" placeholder="请输入需要绑定的手机号">
    </div>
    <div class="ipt_box">
      <input type="tel" v-model="loginModel.code" class="ipt_username" maxLength="4" placeholder="请输入验证码">
      <button class="ipt_sendCode" style="border:none" :class="[rightPhoneNumber ? '' : 'btn_disable']" @click.prevent="sendSms" :disabled="!rightPhoneNumber" v-show="!computedTime">获取验证码</button>
      <div class="ipt_sendCode" @click.prevent v-show="computedTime">已发送({{computedTime}}s)</div>
    </div>
    <div class="btn_fix_bottom">
      <button :class="[isActive ? 'btn_login_over' : 'btn_login_out']" :disabled="loginDisabled" @click="login">登录</button>
      <div style="margin-bottom:20px;"></div>
      <button class="btn_login_over" @click="toRegister()">立即注册</button>
    </div>
  </div>

</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/login.scss';
import * as types from '../vuex/mutation-types';
import {
  Toast
} from 'mint-ui';
export default {
  name: 'login',
  data() {
    return {
      computedTime: 0, // 倒数记时
      loginModel: {
        phone: '',
        code: '',
        login: 'login'
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  mounted() {},

  computed: {
    // 判断手机号码
    rightPhoneNumber() {
      return /^(((13[0-9]{1})|(14[5-7]{1})|(15[0-9]{1})|(17[6-8]{1})|(18[0-9]{1}))+\d{8})$/.test(this.loginModel.phone);
    },
    codeDisabled() {
      return this.rightPhoneNumber;
    },
    isActive() {
      if (this.loginModel.phone !== '' && this.loginModel.code !== '') {
        return true;
      } else {
        return false;
      }
    },
    loginDisabled() {
      if (this.loginModel.phone !== '' && this.loginModel.code !== '') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    plan: function() {
      // 用户点击后准备进入倒计时状态
      // 校验通过后广播ready事件
      this.$broadcast('ready');
    },
    login() {
      // var vm = this;
      let phone = this.loginModel.phone;
      let code = this.loginModel.code;
      if (!this.rightPhoneNumber) {
        Toast({
          message: '请输入正确的手机号！',
          position: 'middle',
          duration: 3000
        });
        return;
      } else {
        let params = {
          phone: phone,
          type: 0,
          code: code
        };
        this.axios.post(this.$store.state.api.check_code, params)
          .then(response => {
            let succeed = response.data.status.succeed;
            if (succeed === '1') {
              this.getLoginToken(phone, code);
            } else {
              // 信息中存在错误码的情况
              let message = response.data.status.error_desc;
              if (typeof message !== 'undefined') {
                Toast({
                  message: message,
                  position: 'middle',
                  duration: 3000
                });
              }

            }
          }).catch(function(error) {
            console.log(error);
            Toast({
              message: '连接失败！',
              position: 'middle',
              duration: 3000
            });
          });
      }
    },
    getLoginToken(phone, code) {
      let params = {
        phone: phone,
        code: code
      };
      this.axios.post(this.$store.state.api.login, params)
        .then(response => {
          console.info(response);
          let succeed = response.data.status.succeed;
          let message = response.data.status.error_desc;
          if (succeed === '1') {
            let token = response.data.data.token;
            this.$store.commit(types.SET_TOKEN, token);
            localStorage.setItem('token', token);
            this.$router.push({
              path: '/'
            });
          } else {
            Toast({
              message: message,
              position: 'middle',
              duration: 3000
            });
          }
        }).catch(function(error) {
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    },
    getMsgAjax() {
      let phone = this.loginModel.phone;
      let params = {
        phone: phone,
        type: 0
      };
      this.axios.post(this.$store.state.api.SMSs, params)
        .then(response => {
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            Toast({
              message: '短信已发送',
              position: 'middle',
              duration: 3000
            });
          } else {
            let message = response.data.status.error_desc;
            Toast({
              message: message,
              position: 'middle',
              duration: 3000
            });
          }
          // this.list = response.data;
        }).catch(function(error) {
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    },
    sendSms() {
      // var vm = this;
      if (this.rightPhoneNumber) {
        this.computedTime = 60;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime === 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      }
      this.getMsgAjax();
    },
    toRegister() {
      this.$router.push({
        path: '/register1'
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.btn_disable {
    color: #ccc !important;
}
</style>
