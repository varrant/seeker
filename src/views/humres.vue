<template>
<div class="humres groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <mt-cell title="邀请加入我的人才库" is-link :to="{ path: 'my-center-cash' }"></mt-cell>
    <mt-cell :title="myCount"></mt-cell>
    <div v-for="humItem in humList" key="humItem">
      <mt-cell :title="humItem.nickname">
        <mt-button size="small" plain>推荐工作</mt-button>
        <mt-button size="small" plain style="margin-left:10px;">查看简历</mt-button>
        <img slot="icon" :src="humItem.avatar_url" width="30" height="30">
      </mt-cell>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/humres.scss';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'humres',
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
      humCount: '',
      humList: []
    };
  },
  computed: {
    myCount() {
      return '目前你的人才库已经22拥有' + this.humCount + '位人才';
    }
  },

  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxHumres();
  },
  methods: {
    getAjaxHumres() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        page: 1
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.mytalent_pool, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          this.humCount = response.data.data.count;
          this.humList = response.data.data;
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
