<template>
<div class="pay-deposit">
  <div class="pay_main">
    <h3>领队保证金<img src="../images/icon.png" @click="explain()"></h3>
    <ul class="pay_ul">
      <li class="pay_frist">
        <h3>保证金额</h3><span>500元</span>
      </li>
      <li class="pay_p">当推荐成功10个人,全额返还（防止刷单现象）</li>
    </ul>
  </div>
  <!-- <a class="pay_inp" href="javascript:;" @click="pay()">立即支付</a> -->
  <div class="btn_fix_bottom">
    <mt-button type="danger" size="large" @click.native="pay()">立即支付</mt-button>
  </div>
  <!--说明-->
  <div class="box_bg" :style="explainObject">
    <div class="pay_box">
      <div class="deposit_word">
        <h3>什么是保证金</h3>
        <div class="box_word">
          <h3>什么是保证金？</h3>
          <p>为了保证履行双方约定而缴纳的钱，在完成双方履行的承诺之后给予退还。</p>
          <h3>保证金去哪儿了？</h3>
          <p>保证金存在乙方个人账户中，在乙方推荐成功入职者未满十人之前，保证金处于冻结状态，不可提现，不可使用。</p>
          <h3>如何退还保证金？</h3>
          <p>经乙方推荐，成功入职满十人，即可全额退还保证金。若发现刷单、逃单等情况，经平台审核情况属实，保证金不予退还。</p>
        </div>
        <a href="javascript:void(0);"><img class="guanbi" src="../images/icon_1.png" @click="closeExplain()" width="52"></a>
      </div>
    </div>
  </div>
  <mt-popup v-model="payWayVisible" position="bottom" class="mint-popup-4">
    <div class="pay_mode">
      <h3>选择支付方式 <a href="javascript:void(0);"><img src="../images/icon_2.png" width="16" @click="closeMethod()" /></a></h3>
      <ul>
        <li>
          <a href="javascript:void(0);" style="color:#05cb04;" @click="payByWeixin()"><img src="../images/wechat1.png" width="24"/> 微信支付</a>
        </li>
        <!-- <li>
          <a href="javascript:void(0);" style="color: #01a9ef;"><img src="../images/alipay1.png" width="24" /> 支付宝 <img class="img_1" src="../images/icon_3.png" width="7" /></a>
        </li> -->
      </ul>
    </div>
  </mt-popup>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/pay-deposit.scss';
import {
  Indicator
} from 'mint-ui';
export default {
  data() {
    return {
      explainObject: {
        display: 'none'
      },
      payWayObject: {
        display: 'none'
      },
      payWayVisible: false
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    explain() {
      this.explainObject.display = 'block';
    },
    closeExplain() {
      this.explainObject.display = 'none';
    },
    pay() {
      this.payWayVisible = true;
    },
    closeMethod() {
      this.payWayVisible = false;
    },
    payByWeixin() {
      console.info(this.$store.state.auth.token);
      this.payWayVisible = false;
      Indicator.open({
        text: '正在跳转',
        spinnerType: 'fading-circle'
      });
      this.$router.push({
        path: '/'
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
