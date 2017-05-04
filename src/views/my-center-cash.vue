<template>
<div class="my-center-cash groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div v-if="modeObj.method_id">
      <div class="special-bg cash-mb">
        <div class="mention-way-left"><span>支付宝</span></div>
        <div class="mention-way-right">
          <span>账号：{{modeObj.account}}</span>
          <span>姓名：{{modeObj.name}}</span>
        </div>
        <div class="clearbox"></div>
      </div>
    </div>
    <div v-else>
      <mt-cell title="添加提现设置" class="font-color" is-link :to="{ path: 'my-center-cash-set' }"></mt-cell>
    </div>


    <div class="mytopbox">
      <div class="info">
        <div class="name">提现金额</div>
        <div class="cashboxs">
          <div class="sign">¥</div>
          <input type="text" v-model="inputAmount" placeholder="0.00" maxLength="9">
        </div>

      </div>
      <div class="info2">
        <div>实际提现金额：<span style="color:red">{{inputAmountLimit}} &nbsp;</span></div>
        <div>可提现金额：<input readOnly style="border:0px" type="text" v-model="balance"></input>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;冻结金额：<input readOnly style="border:0px" type="text" v-model="frozenAmount"></input>&nbsp;</div>
        <div>
          提现疑问 <i class="fa fa-question-circle" aria-hidden="true" @click="explain()"></i>
        </div>
        <div class="allcash" @click="allWithdraw()">全部提现</div>
      </div>
    </div>
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
  <!-- <mt-popup v-model="payWayVisible" position="bottom" class="mint-popup-4">
    <div class="pay_mode">
      <h3>选择提现方式 <a href="javascript:void(0);"><img src="../images/icon_2.png" width="16" @click="closeMethod()" /></a></h3>
      <ul>
        <li class="mode_frist">
          <a href="javascript:void(0);" style="color:#05cb04;"><img src="../images/wechat1.png" width="24" /> 微信支付 <img class="img_1" src="../images/icon_3.png" width="7" /></a>
        </li>
        <li>
          <a href="javascript:void(0);" style="color: #01a9ef;"><img src="../images/alipay1.png" width="24" /> 支付宝 <img class="img_1" src="../images/icon_3.png" width="7" /></a>
        </li>
      </ul>
    </div>
  </mt-popup> -->
  <div class="btn_fix_bottom">
    <mt-button type="danger" size="large" @click.native="pay()">确认提现</mt-button>
  </div>
</div>
</template>
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.mint-popup-4 {
    width: 100%;
    .picker-item,
    .picker-slot-wrapper {
        backface-visibility: hidden;
    }
}
</style>
<script type="application/ecmascript">
import '../styles/sass/my-center-cash.scss';
import {
  Toast,
  MessageBox,
  Indicator
} from 'mint-ui';
export default {
  name: 'my-center-cash',
  data() {
    return {
      explainObject: {
        display: 'none'
      },
      payWayObject: {
        display: 'none'
      },
      inputAmount: '',
      // payWayVisible: false,
      iscrollConf: {
        mouseWheel: true,
        vScrollbar: true,
        click: true,
        preventDefault: true,
        tap: true,
        bounce: true,
        disableTouch: false
      },
      balanceObj: '',
      modeObj: ''
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxApplicationShow();
  },
  computed: {
    balance() {
      return this.toNumber(this.balanceObj.balance);
    },
    frozenAmount() {
      return this.toNumber(this.balanceObj.frozen_amount);
    },
    inputAmountLimit() {
      if (/^((?!0)\d+(.\d{1,2})?)$/.test(this.inputAmount)) {
        return this.inputAmount;
      } else {
        return this.toRealNumber(this.inputAmount);
      }
    }
  },
  methods: {
    getAjaxApplicationShow() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.application_show, params)
        .then(response => {
          console.info(response);
          Indicator.close();
          this.balanceObj = response.data.data.balance;
          this.modeObj = response.data.data.mode;
        }).catch(function(error) {
          console.log(error);
          Indicator.close();
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    },
    explain() {
      this.explainObject.display = 'block';
    },
    closeExplain() {
      this.explainObject.display = 'none';
    },
    getAjaxapplicationOrder() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        method_id: this.modeObj.method_id,
        amount: parseFloat(this.inputAmountLimit) * 100
      };
      this.axios.post(this.$store.state.api.application_order, params)
        .then(response => {
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            MessageBox.alert('提现成功，自动跳转到个人中心!').then(action => {
              this.$router.push({
                path: '/my-center'
              });
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
    pay() {
      let method_id = this.modeObj.method_id;
      let inputLimit = parseFloat(this.inputAmountLimit);
      let inputBalance = parseFloat(this.balance);
      if (method_id !== '' && method_id !== null) {
        if (this.inputAmountLimit < 50) {
          Toast({
            message: '额度输入有误，或少于50',
            position: 'middle',
            duration: 3000
          });
        } else if (inputLimit > inputBalance) {
          Toast({
            message: '额度已超出可提现额度',
            position: 'middle',
            duration: 3000
          });
        } else {
          this.getAjaxapplicationOrder();
        }
      } else {
        Toast({
          message: '请先填写提现方式',
          position: 'middle',
          duration: 3000
        });
      }
      // this.payWayVisible = true;
    },
    closeMethod() {
      this.payWayVisible = false;
    },
    allWithdraw() {
      console.info(this.balanceObj.balance);
      let inputAmount = this.balanceObj.balance;
      this.inputAmount = this.toNumber(inputAmount);
    },
    toRealNumber(num) {
      let number = Number(num) || 0;
      return number.toFixed(2); // 保留两位小数
    },
    toNumber(num) {
      let number = Number(num / 100) || 0;
      return number.toFixed(2); // 保留两位小数
    }
  }
};
</script>
