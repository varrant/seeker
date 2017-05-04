<template>
<div class="two-code groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="background">
      <div class="code_title">
        <h3 class="">{{codeObject.name}}</h3>
        <ul class="title_list">
          <li>
            <h3>薪资待遇</h3>{{codeObject.salary}}/天
          </li>
          <li>
            <h3>福利待遇</h3>{{codeObject.benefits}}
          </li>
        </ul>
      </div>
    </div>
    <!--二维码-->
    <div class="code_view">
      <div class="code_img"><img :src="qrcodeUrl" width="148px" height="152px" />
      </div>
      <div class="code_text">
        <p>长按识别 一起速职</p>
      </div>

    </div>
  </div>
</div>
</template>
<script type="application/ecmascript">
import '../styles/sass/two-code.scss';
import {
  Toast
} from 'mint-ui';
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
      },
      codeObject: '',
      qrcodeUrl: ''
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getStartAjax();
  },
  methods: {
    getStartAjax() {
      let token = this.$store.state.auth.token;
      let headhunter_order_id = this.$router.currentRoute.params.id;
      console.info(token);
      console.info(headhunter_order_id);
      let params = {
        token: token,
        headhunter_order_id: headhunter_order_id
      };
      this.axios.post(this.$store.state.api.generalize_code, params)
        .then(response => {
          console.info(response);
          this.qrcodeUrl = response.data.data.qrcode_url;
          this.codeObject = response.data.data.tasks;
        }).catch(function(error) {
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
