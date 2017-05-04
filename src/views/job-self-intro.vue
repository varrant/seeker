<template>
<div class="my-center-info groundGray" v-iscroll="">
  <div class="scoll-layer special-height">
    <div class="scoll-layer special-height">
      <div class="page-part">
        <mt-field v-model="selfInfo.content" class="ipt_coupon" placeholder="请填写个人介绍" type="textarea" rows="10"></mt-field>
      </div>
      <div class="btn_fix_bottom">
        <mt-button type="danger" size="large" @click.native="save()">保存</mt-button>
      </div>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/my-center-info.scss';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'job-self-intro',
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
      selfInfo: {
        content: '',
        self_intro_id: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxPreview();
  },
  methods: {
    getAjaxPreview() {
      let token = this.$store.state.auth.token;
      this.self_intro_id = this.$router.currentRoute.params.self_intro_id;
      if (this.self_intro_id === 'self_intro_id') {
        return;
      }
      let params = {
        token: token
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.preview, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            this.selfInfo = response.data.data.self_intro;
          }
        }).catch(function(error) {
          Indicator.close();
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    },
    save() {
      let self = this;
      this.self_intro_id = this.$router.currentRoute.params.self_intro_id;
      Indicator.open({
        text: '正在保存',
        spinnerType: 'fading-circle'
      });
      let params = {
        token: this.$store.state.auth.token,
        content: this.selfInfo.content,
        self_intro_id: this.selfInfo.self_intro_id
      };
      this.axios.post(this.$store.state.api.self_intro, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            Toast({
              message: '信息保存成功',
              position: 'middle',
              duration: 1000
            });
            setTimeout(function() {
              self.$router.go(-1);
            }, 1000);
          } else {
            Toast({
              message: message,
              position: 'middle',
              duration: 1000
            });
          }
        }).catch(function(error) {
          Indicator.close();
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 1000
          });
        });
    }
  }
};
</script>
