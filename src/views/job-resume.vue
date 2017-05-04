<template>
<div class="my-center-info groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="menu_list">
      <!-- <mt-cell title="我的订单" is-link :to="{ path: 'my-order-list' }"></mt-cell> -->
      <mt-field label="昵称" placeholder="请填写昵称" type="" v-model="personInfo.nickname"></mt-field>
      <!-- <mt-field label="性别" placeholder="请填写性别" type="" v-model="personInfo.gender"></mt-field> -->
      <div style="height:48px;background-color:#fff;margin-top:1px;">
        <div style="padding-left:10px;float:left;width:28%;line-height:48px;height:48px">性别</div>
        <div style="float:left;width:68%;line-height:48px;height:48px"><select v-model="personInfo.gender">
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
        </div>
      </div>
      <mt-field label="生日" placeholder="请填写生日" type="date" v-model="personInfo.birthday"></mt-field>
      <!-- <mt-field label="最高学历" placeholder="请填写学历" type="" v-model="personInfo.highest_degree"></mt-field> -->
      <div style="height:48px;background-color:#fff;margin-top:1px;">
        <div style="padding-left:10px;float:left;width:28%;line-height:48px;height:48px">学历</div>
        <div style="float:left;width:68%;line-height:48px;height:48px"><select v-model="personInfo.highest_degree">
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
      <mt-field label="工作年限" placeholder="请填写工作年限" type="" v-model="personInfo.work_year"></mt-field>
      <mt-field label="所在城市" placeholder="请填写所在城市(1代表杭州)" type="" v-model="personInfo.city_id"></mt-field>
      <!-- <mt-field label="联系电话" placeholder="请填写联系电话" type="tel" v-model="personInfo.enroll_year"></mt-field> -->
      <mt-field label="联系邮箱" placeholder="请填写联系邮箱" type="email" v-model="personInfo.work_email"></mt-field>
      <div style="width: 88%;position:absolute;left: 6%;">
        <button style="margin-top:20px" class="btn_login_over" @click="modify()">保存</button>
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
import Avatar from 'vue-avatar/dist/Avatar';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'my-center',
  components: {
    Avatar
  },
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
      personInfo: {
        nickname: '',
        phone_number: '',
        avatar_url: '',
        real_name: '',
        gender: '',
        birthday: '2012-06-01',
        highest_degree: '',
        work_year: '',
        city_id: '',
        work_email: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxPreview();
  },
  computed: {},
  methods: {
    upload: function(e) {
      e.preventDefault();
      console.info(e);
      var files = e.target.files;
      var data = new FormData();
      data.append('avatar', files[0]);
      console.info(data);
    },
    modify() {
      let self = this;
      let token = this.$store.state.auth.token;
      console.info(this.personInfo.gender);
      let params = {
        token: token,
        nickname: this.personInfo.nickname,
        phone_number: this.personInfo.phone_number,
        real_name: this.personInfo.real_name,
        gender: this.personInfo.gender,
        birthday: this.personInfo.birthday,
        highest_degree: this.personInfo.highest_degree,
        work_year: this.personInfo.work_year,
        city_id: this.personInfo.city_id,
        work_email: this.personInfo.work_email
      };
      Indicator.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.selfinfo, params)
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
    toNumber(num) {
      let number = Number(num / 100) || 0;
      return number.toFixed(2); // 保留两位小数
    },
    getAjaxPreview() {
      let token = this.$store.state.auth.token;
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
            this.personInfo = response.data.data.user_info;
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
    }
  }
};
</script>
