<template>
<div class="my-center-cash-set groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <mt-cell title="支付宝账户信息"></mt-cell>
    <div class="page-part">
      <mt-field label="支付宝账号" v-model="alipayAccount" placeholder="请输入支付宝帐号" type="text"></mt-field>
      <mt-field label="支付宝真实姓名" v-model="alipayName" placeholder="请输入支付宝转账真实姓名" type="text" ></mt-field>
      <span class="tips"> 注：因涉及到您的提现资金，请填写您正确的提现信息</span>
    </div>
  </div>
  <div class="btn_fix_bottom">
    <mt-button type="danger" size="large" @click.native="confirm">确定</mt-button>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/my-center-cash-set.scss';
import {
  Toast,
  MessageBox
} from 'mint-ui';
export default {
  name: 'my-center-cash-set',
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
      alipayAccount: '',
      alipayName: ''
    };
  },
  computed: {},
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    confirmAjax() {
      let token = this.$store.state.auth.token;
      // console.info(this.alipayAccount);
      let params = {
        token: token,
        issuer: 0,
        account: this.alipayAccount,
        name: this.alipayName,
        extra_info: '支付宝',
        comment: '我的支付宝'
      };
      this.axios.post(this.$store.state.api.withdraw_profile, params)
        .then(response => {
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            MessageBox.alert('添加成功!').then(action => {
              this.$router.push({
                path: '/my-center-cash'
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
    confirm() {
      this.confirmAjax();
    }
  }
};
</script>
