<template>
<div class="coupon groundGray" v-iscroll="">
  <div class="scoll-layer special-height">
    提现成功
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/coupon.scss';
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {}
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
