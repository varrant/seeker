<template>
<div class="recommended-prizes" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="recommended_bg_img">
      <div class="immediately_recommend">
        <button @click="guide()">立即推荐</button>
      </div>
    </div>
    <div class="recommended_activity_rule">
      <div class="immediately_font">
        <span>活动规则</span>
      </div>
      <div class="activity_rule">
        <p>1、邀请好友注册猎头，您可获得100元红包奖励。</p>
        <p>2、如存在违规行为（包括恶意套现、及其作弊），速职将取消您的参与资格，相关红包将作废。</p>
        <p>3、此活动最终解释权归速职所有。</p>
      </div>
    </div>
    <div class="cover" :style="coverObject" @click="hide()"></div>
    <div class="guide" :style="guideObject"><img src="../images/guide.png"></div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/recommended-prizes.scss';
export default {
  data() {
    return {
      coverObject: {
        display: 'none'
      },
      guideObject: {
        display: 'none'
      },
      iscrollConf: {
        mouseWheel: true,
        vScrollbar: true,
        click: true,
        preventDefault: true,
        tap: true,
        bounce: true,
        disableTouch: false
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
    guide() {
      this.coverObject.display = 'block';
      this.guideObject.display = 'block';
    },
    hide() {
      this.coverObject.display = 'none';
      this.guideObject.display = 'none';
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
