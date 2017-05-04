<template>
<div class="register" v-iscroll="">
  <div class="scoll-layer special-height">
    <div class="logo"></div>
    <div class="ipt_box">
      <input type="tel" class="ipt_username" v-model="registerModel.phone" @blur="checkPhoneBlur" @keypress="phoneChange" placeholder="请输入需要绑定的手机号">
    </div>
    <div class="ipt_box">
      <input type="tel" class="ipt_username" v-model="registerModel.code" placeholder="请输入验证码">
      <button class="ipt_sendCode" style="border:none" :class="[codeDisabled ? '' : 'btn_disable']" @click.prevent="sendSms" :disabled="!codeDisabled" v-show="!computedTime">获取验证码</button>
      <div class="ipt_sendCode" @click.prevent v-show="computedTime">已发送({{computedTime}}s)</div>
    </div>
    <mt-checklist v-model="agree" :options="['我已经阅读并同意速职用户协议']">
    </mt-checklist>
    <div class="btn_fix_bottom">
      <button :class="[isActive ? 'btn_login_over' : 'btn_login_out']" :disabled="registerDisabled" @click="register1">下一步</button>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/register.scss';
import * as types from '../vuex/mutation-types';
import {
  Toast
} from 'mint-ui';
export default {
  name: 'register1',
  data() {
    return {
      computedTime: 0, // 倒数记时
      iscrollConf: {
        mouseWheel: true,
        vScrollbar: true,
        click: true,
        preventDefault: true,
        tap: true,
        bounce: true,
        disableTouch: false
      },
      registerModel: {
        phone: '',
        code: ''
      },
      checkPhone: false,
      agree: []
    };
  },
  mounted() {},
  computed: {
    // 判断手机号码
    rightPhoneNumber() {
      return /^(((13[0-9]{1})|(14[5-7]{1})|(15[0-9]{1})|(17[6-8]{1})|(18[0-9]{1}))+\d{8})$/.test(this.registerModel.phone);
    },
    codeDisabled() {
      return this.rightPhoneNumber && this.checkPhone;
    },
    isActive() {
      if (this.registerModel.phone !== '' && this.registerModel.code !== '' && this.agree[0] === '我已经阅读并同意速职用户协议') {
        return true;
      } else {
        return false;
      }
    },
    registerDisabled() {
      if (this.registerModel.phone !== '' && this.registerModel.code !== '' && this.agree[0] === '我已经阅读并同意速职用户协议') {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    phoneChange() {
      this.checkPhone = false;
    },
    checkPhoneBlur() {
      this.checkPhone = false;
      if (!this.rightPhoneNumber) {
        Toast({
          message: '手机号码不正确',
          position: 'middle',
          duration: 1000
        });
        return;
      }
      let params = {
        phone: this.registerModel.phone,
        type: 2
      };
      this.axios.post(this.$store.state.api.check_phone, params).then(response => {
        let succeed = response.data.status.succeed;
        if (succeed === '1') {
          this.checkPhone = true;
        } else {
          let message = response.data.status.error_desc;
          this.checkPhone = false;
          Toast({
            message: message,
            position: 'middle',
            duration: 1000
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
    sendSms() {
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
    getMsgAjax() {
      let params = {
        phone: this.registerModel.phone,
        type: 1
      };
      this.axios.post(this.$store.state.api.SMSs, params).then(response => {
        let succeed = response.data.status.succeed;
        if (succeed === '1') {
          Toast({
            message: '短信已发送',
            position: 'middle',
            duration: 1000
          });
        } else {
          let message = response.data.status.error_desc;
          Toast({
            message: message,
            position: 'middle',
            duration: 1000
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
    register1() {
      // var vm = this;
      let phone = this.registerModel.phone;
      let code = this.registerModel.code;
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
          type: 1,
          code: code
        };
        this.axios.post(this.$store.state.api.check_code, params)
          .then(response => {
            // console.info(response);
            let succeed = response.data.status.succeed;
            let message = response.data.status.error_desc;
            if (succeed === '1') {
              this.getRegisterToken(phone, code);
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
      }
    },
    getRegisterToken(phone, code) {
      let params = {
        phone: phone,
        code: code
      };
      this.axios.post(this.$store.state.api.register, params)
        .then(response => {
          let succeed = response.data.status.succeed;
          // 全局he_id 注意这边的数据接口，很丑！！！
          if (succeed === '1') {
            let token = response.data.data.token;
            this.$store.commit(types.SET_TOKEN, token);
            localStorage.setItem('token', token);
            this.$router.push({
              path: '/job-talent-pool'
            });
          }
        }).catch(function(error) {
          console.log(error);
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
