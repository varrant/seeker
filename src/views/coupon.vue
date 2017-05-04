<template>
<div class="coupon groundGray" v-iscroll="">
  <div class="scoll-layer special-height">
    <!-- <div class="pay_main">
      <input type="text" v-model="coupon.code" class="ipt_coupon" placeholder="请输入优惠码">
    </div> -->
    <!-- <a class="pay_inp" href="javascript:;" @click="pay()">立即支付</a> -->
    <!-- <div class="btn_fix_bottom">
      <mt-button type="danger" size="large" @click.native="pay()">兑换</mt-button>
    </div> -->
    <div class="page-part">
      <mt-field v-model="coupon.code" class="ipt_coupon" placeholder="请输入优惠码" type="text"></mt-field>
      <span class="tips"> 注：兑换码，请填写您正确的提现信息</span>
    </div>
    <div class="btn_fix_bottom">
      <mt-button type="danger" size="large" @click.native="pay()">兑换</mt-button>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/coupon.scss';
import {
  Indicator,
  Toast
} from 'mint-ui';
export default {
  data() {
    return {
      coupon: {
        code: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    pay() {
      console.info(this.$store.state.auth.token);
      Indicator.open({
        text: '正在支付',
        spinnerType: 'fading-circle'
      });
      let params = {
        token: this.$store.state.auth.token,
        code: this.coupon.code
      };
      this.axios.post(this.$store.state.api.promotion, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          let message = response.data.status.error_desc;
          if (succeed === '1') {
            this.$router.push({
              path: '/'
            });
          } else {
            Toast({
              message: message,
              position: 'middle',
              duration: 5000
            });
          }
        }).catch(function(error) {
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 5000
          });
        });
    }
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.mint-popup-4 {
    width: 100%;
    .picker-item,
    .picker-slot-wrapper {
        backface-visibility: hidden;
    }
}
</style>
