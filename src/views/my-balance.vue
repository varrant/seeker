<template>
<div class="my-balance groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="balance_top">
      <h3>当前余额（元）</h3>
      <p>{{myBalance}}</p>
    </div>
    <mt-cell title="提现" is-link :to="{ path: 'my-center-cash' }"></mt-cell>
  </div>
</div>
</template>
<script type="application/ecmascript">
import '../styles/sass/my-balance.scss';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'my-balance',
  data() {
    return {
      iscrollConf: {
        mouseWheel: true,
        vScrollbar: true,
        click: true,
        preventDefault: true,
        tap: true,
        bounce: true,
        disableTouch: false
      },
      balanceObj: ''

    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxBalance();
  },
  computed: {
    myBalance() {
      return this.toNumber(this.balanceObj.balance);
    }
  },
  methods: {
    toNumber(num) {
      let number = Number(num / 100) || 0;
      return number.toFixed(2); // 保留两位小数
    },
    getAjaxBalance() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.balance, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          this.balanceObj = response.data.data;
        }).catch(function(error) {
          Indicator.close();
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    }
  }
};
</script>
