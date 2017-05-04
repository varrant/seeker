<template>
<div class="my-center-info groundGray" v-iscroll="">
  <div class="scoll-layer">
    <div class="menu_list">
      <!-- <mt-cell title="我的订单" is-link :to="{ path: 'my-order-list' }"></mt-cell> -->
      <mt-field label="项目名称" placeholder="请填写项目名称" type="" v-model="projectExp.project_name"></mt-field>
      <mt-field label="你的职位" placeholder="请填写你的职位" type="" v-model="projectExp.responsibility"></mt-field>
      <mt-field label="开始时间" placeholder="请填写开始时间" type="date" v-model="projectExp.start_time"></mt-field>
      <mt-field label="结束时间" placeholder="请填写结束时间" type="date" v-model="projectExp.end_time"></mt-field>
      <mt-field label="项目链接" placeholder="请填写项目链接" type="" v-model="projectExp.project_url"></mt-field>
      <mt-field label="项目描述" placeholder="请填写项目描述" type="textarea" rows="4" v-model="projectExp.description"></mt-field>
      <div style="width: 88%;position:absolute;left: 6%;">
        <div v-if="project_id!='project_id'">
          <button style="margin-top:20px" class="btn_delete_over" @click="deleteProject()">删除</button>
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
  name: 'job-project-exp',
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
      projectExp: {
        project_name: '',
        responsibility: '',
        start_time: '2008-09-01',
        end_time: '2012-06-01',
        description: '',
        project_url: '',
        project_id: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.project_id = this.$router.currentRoute.params.project_id;
    if (this.project_id !== 'project_id') {
      this.getAjaxPreview();
    }
  },
  computed: {},
  methods: {
    getAjaxPreview() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        project_id: this.project_id
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.show_project, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            this.projectExp = response.data.data;
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
        project_name: this.projectExp.project_name,
        responsibility: this.projectExp.responsibility,
        start_time: this.projectExp.start_time,
        end_time: this.projectExp.end_time,
        description: this.projectExp.description,
        project_url: this.projectExp.project_url,
        project_id: this.projectExp.project_id
      };
      Indicator.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.project_experience, params)
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
        project_id: this.project_id
      };
      Indicator.open({
        text: '删除中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.delete_job, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            Toast({
              message: '删除成功！',
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
            duration: 1000
          });
        });
    },
    deleteProject() {
      MessageBox.confirm('确认删除吗?').then(action => {
        this.deleteAjax();
      });
    }
  }
};
</script>
