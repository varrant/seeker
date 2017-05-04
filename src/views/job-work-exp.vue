<template>
<div class="my-center-info groundGray" v-iscroll="">
  <div class="scoll-layer">
    <div class="menu_list">
      <!-- <mt-cell title="我的订单" is-link :to="{ path: 'my-order-list' }"></mt-cell> -->
      <mt-field label="公司名称" placeholder="请填写公司名称" type="" v-model="workExp.firm_name"></mt-field>
      <mt-field label="你的职位" placeholder="请填写你的职位" type="" v-model="workExp.occupation"></mt-field>
      <mt-field label="入职时间" placeholder="请填写入职时间" type="date" v-model="workExp.start_time"></mt-field>
      <mt-field label="离职时间" placeholder="请填写离职时间" type="date" v-model="workExp.end_time"></mt-field>
      <mt-field label="工作内容" placeholder="请填写您的工作内容" type="textarea" rows="4" v-model="workExp.content"></mt-field>
      <div style="width: 88%;position:absolute;left: 6%;">
        <div v-if="work_id!='work_id'">
          <button style="margin-top:20px" class="btn_delete_over" @click="deleteWorkExp()">删除</button>
        </div>
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
  Indicator,
  MessageBox
} from 'mint-ui';
export default {
  name: 'job-work-exp',
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
      workExp: {
        firm_name: '',
        occupation: '',
        start_time: '2008-09-01',
        end_time: '2012-06-01',
        content: '',
        work_id: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.work_id = this.$router.currentRoute.params.work_id;
    if (this.work_id !== 'work_id') {
      this.getAjaxPreview();
    }
  },
  computed: {

  },
  methods: {
    getAjaxPreview() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        work_id: this.work_id
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.show_work, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            this.workExp = response.data.data;
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
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        firm_name: this.workExp.firm_name,
        occupation: this.workExp.occupation,
        content: this.workExp.content,
        work_id: this.workExp.work_id,
        start_time: this.workExp.start_time,
        end_time: this.workExp.end_time
      };
      Indicator.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.work_experience, params)
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
    deleteAjax() {
      let self = this;
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        work_id: this.work_id
      };
      Indicator.open({
        text: '删除中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.delete_work, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            Toast({
              message: '删除成功',
              position: 'middle',
              duration: 1000
            });
            setTimeout(function() {
              self.$router.go(-1);
            }, 1000);
          };
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
    deleteWorkExp() {
      MessageBox.confirm('确认删除吗?').then(action => {
        this.deleteAjax();
      });
    }
  }
};
</script>
