<template>
<div class="center groundGray">
    <div class="center_top">
      <div class="center_top_head"><a href="javascript:void(0);">
        <div class="center_img"><img src="../images/head1.png" width="100%" /></div>
        <div class="center_word">
          <h3>tanzhuguo</h3>
          <p>15857131870</p>
        </div>
        <img src="../images/right.png" class="center_top_head_icon" width="14" />
      </a></div>

      <div class="center_top_foot">
        <h3 class="">余额：18000.00元</h3>
        <a href="javascript:void(0);">账户安全保障中 <img src="../images/right.png" class="" width="14" /></a>
      </div>
    </div>
      <mt-cell title="我的订单" is-link></mt-cell>
      <mt-cell title="我的人才库" is-link></mt-cell>
      <mt-cell title="推荐有奖" is-link></mt-cell>
      <mt-cell title="任务意向设置" is-link></mt-cell>
      <mt-cell title="提现设置" is-link></mt-cell>
      <mt-cell title="意见反馈" is-link></mt-cell>
  </div>
</template>

<script type="application/ecmascript">
import '../styles/sass/center.scss';
// import api from '../constant/api';
// import * as types from '../vuex/mutation-types';
export default {
  name: '',
  data() {
    return {
      msg: '',
      list: []
    };
  },
  mounted() {
    // this.$store.commit(types.TITLE, 'center');
  },
  methods: {
  }
};
</script>
