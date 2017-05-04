<template>
<div class="my-center-info groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="menu_list">
      <mt-field label="学校" placeholder="请填写学校" type="" v-model="eduExp.school_name"></mt-field>
      <!-- <mt-field label="学历" placeholder="请填写学历" type="" v-model="eduExp.degree"></mt-field> -->
      <div style="height:48px;background-color:#fff;margin-top:1px;">
        <div style="padding-left:10px;float:left;width:28%;line-height:48px;height:48px">学历</div>
        <div style="float:left;width:68%;line-height:48px;height:48px"><select v-model="eduExp.degree">
            <option value="0">小学</option>
            <option value="1">初中</option>
            <option value="2">高中</option>
            <option value="3">大专</option>
            <option value="4">本科</option>
            <option value="5">硕士</option>
            <option value="6">博士</option>
            <option value="7">博士后</option>
          </select>
        </div>
      </div>
      <mt-field label="专业" placeholder="请填写专业" type="" v-model="eduExp.major"></mt-field>
      <mt-field label="开始年份" placeholder="请填写开始年份" type="date" v-model="eduExp.start_time"></mt-field>
      <mt-field label="毕业时间" placeholder="请填写毕业时间" type="date" v-model="eduExp.end_time"></mt-field>
      <div style="width: 88%;position:absolute;left: 6%;">
        <div v-if="education_id!='education_id'">
          <button style="margin-top:20px" class="btn_delete_over" @click="deleteEdu()">删除</button>
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
  name: 'job-edu-exp',
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
      eduExp: {
        school_name: '',
        degree: '4',
        major: '',
        start_time: '2008-09-01',
        end_time: '2012-06-01',
        education_id: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.education_id = this.$router.currentRoute.params.education_id;
    if (this.education_id !== 'education_id') {
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
        education_id: this.education_id
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.show_education, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            this.eduExp = response.data.data;
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
      let params;
      if (this.education_id !== 'education_id') {
        params = {
          token: token,
          school_name: this.eduExp.school_name,
          degree: this.eduExp.degree,
          major: this.eduExp.major,
          start_time: this.eduExp.start_time,
          end_time: this.eduExp.end_time,
          education_id: this.education_id
        };
      } else {
        params = {
          token: token,
          school_name: this.eduExp.school_name,
          degree: this.eduExp.degree,
          major: this.eduExp.major,
          start_time: this.eduExp.start_time,
          end_time: this.eduExp.end_time,
          education_id: ''
        };
      }

      Indicator.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.education_experience, params)
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
      let token = this.$store.state.auth.token;
      let params = {
        token: token,
        education_id: this.education_id
      };
      Indicator.open({
        text: '删除中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.delete_education, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            // this.$router.push({
            //   path: '/job-talent-pool'
            // });
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
    deleteEdu() {
      MessageBox.confirm('确认删除吗?').then(action => {
        this.deleteAjax();
      });
    }
  }
};
</script>
