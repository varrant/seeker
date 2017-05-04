<template>
<div class="my-center-info groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="menu_list">
      <mt-field label="期望职位" placeholder="请填写期望职位" type="" v-model="hopeWork.occupation"></mt-field>
      <!-- <mt-field label="工作类型" placeholder="请填写工作类型" type="" v-model="hopeWork.job_type"></mt-field> -->
      <div style="height:48px;background-color:#fff;margin-top:1px;">
        <div style="padding-left:10px;float:left;width:28%;line-height:48px;height:48px">工作类型</div>
        <div style="float:left;width:68%;line-height:48px;height:48px"><select v-model="hopeWork.job_type">
            <option value="0">兼职</option>
            <option value="1">全职</option>
            <option value="2">实习</option>
          </select>
        </div>
      </div>
      <mt-field label="期望城市" placeholder="请填写期望城市" type="" v-model="hopeWork.city"></mt-field>
      <mt-field label="期望月薪下限" placeholder="请填写期望月薪下限" type="tel" v-model="hopeWork.wage_lower"></mt-field>
      <mt-field label="期望月薪上限" placeholder="请填写期望月薪上限" type="tel" v-model="hopeWork.wage_upper"></mt-field>
      <div style="width: 88%;position:absolute;left: 6%;">
        <button style="margin-top:20px" class="btn_login_over" @click="save()">保存</button>
      </div>
    </div>
    <!-- 补充被tab遮挡的高度 55px -->
    <div style="height:55px"></div>
    <!-- 补充被tab遮挡的高度 55px -->
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
  name: 'my-center',
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
      hopeWork: {
        occupation: '',
        job_type: '0',
        city: '',
        wage_lower: '',
        wage_upper: '',
        job_id: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxPreview();
  },
  methods: {
    save() {
      let self = this;
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        occupation: this.hopeWork.occupation,
        job_type: this.hopeWork.job_type,
        city: this.hopeWork.city,
        wage_lower: this.hopeWork.wage_lower,
        wage_upper: this.hopeWork.wage_upper,
        job_id: this.hopeWork.job_id
      };
      Indicator.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.job_intention, params)
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
              message: '信息保存失败',
              position: 'middle',
              duration: 1000
            });
          }
          // this.personInfo = response.data.data;
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

    getAjaxPreview() {
      let token = this.$store.state.auth.token;
      this.job_id = this.$router.currentRoute.params.job_id;
      let params;
      if (this.job_id === 'job_id') {
        return;
      } else {
        params = {
          token: token,
          job_id: this.job_id
        };
      }

      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.show_job, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          this.hopeWork = response.data.data;
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
