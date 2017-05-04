<template>
<div class="register">
  <div style="margin-top: 50px;"></div>
  <div class="ipt_box">
    <input type="text" class="ipt_username" v-model="registerModel.he_name" placeholder="请输入真实姓名">
  </div>
  <div class="ipt_box">
    <input type="text" class="ipt_username" v-model="registerModel.he_card" placeholder="请输入身份证号">
  </div>
  <!-- <div class="ipt_box">d
    <div class="listItem">
      <div class="title">上传证件照</div>
      <div class="pic">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
        <input id="he_idimg" name="he_idimg" type="hidden">
        <input id="file_upload" name="file_upload" type="file" multiple="true">
      </div>
    </div>
    <div class="listItem">
      <div class="title">上传证件照</div>
      <div class="pic">
        <img src="images/reg_eg1.png" alt="">
      </div>
    </div>
    <div class="clearbox"></div>
  </div> -->
  <div style="margin-top: 120px;"></div>
  <div class="btn_fix_bottom">
    <button :class="[isActive ? 'btn_login_over' : 'btn_login_out']" :disabled="disabled" @click="register2">下一步</button>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/register.scss';
import * as types from '../vuex/mutation-types';
import {
  Toast
} from 'mint-ui';
var regCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
export default {
  name: 'register1',
  data() {
    return {
      registerModel: {
        he_card: '',
        he_name: ''
      }
    };
  },
  mounted() {},
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  computed: {
    isActive() {
      if (this.registerModel.he_name !== '' && this.registerModel.he_card !== '') {
        return true;
      } else {
        return false;
      }
    },
    disabled() {
      if (this.registerModel.he_name !== '' && this.registerModel.he_card !== '') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    register2() {
      let he_name = this.registerModel.he_name;
      let he_card = this.registerModel.he_card;
      if (!regCard.test(he_card)) {
        Toast({
          message: '请输入正确的身份证号码！',
          position: 'middle',
          duration: 3000
        });
        return;
      } else {

        let params = {
          he_id: this.$store.state.params.he_id,
          card_no: he_card,
          real_name: he_name
        };
        console.info(this.$store.state.params.he_id);
        this.axios.post(this.$store.state.api.second_register, params)
          .then(response => {
            let succeed = response.data.status.succeed;
            if (succeed === '1') {
              // 全局token
              let token = response.data.data.token;
              console.info(token);
              this.$store.commit(types.SET_TOKEN, token);
              // this.$router.push({
              //   path: '/pay-deposit'
              // });
              // 先跳转到优惠码界面
              this.$router.push({
                path: '/paid-plans'
              });
            }

          }).catch(function(error) {
            console.log(error);
            Toast({
              message: '连接失败！',
              position: 'bottom',
              duration: 5000
            });
          });
      }
    }
  }
};
</script>
