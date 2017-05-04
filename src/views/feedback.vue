<template>
<div class="feedback groundNormal" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="tel">客服电话：0571-87211611</div>
    <a href="tel:0571-87211611" class="tel_img">
    <!-- <img src="../images/taskdetailicon1.png"> -->
    <i class="iconfont icon-kefu myicon"></i>
  </a>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/feedback.scss';
// import api from '../constant/api';
// import * as types from '../vuex/mutation-types';
export default {
  name: '',
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
      }
    };
  },
  mounted() {
    // this.$store.commit(types.TITLE, 'center');
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {}
};
</script>
