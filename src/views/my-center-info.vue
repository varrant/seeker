<template>
<div class="my-center-info groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="mytopbannerbox">
      <div class="info">
        <div class="head">
          <avatar :username="personInfo.real_name" :src="personInfo.avatar_url"></avatar>
          <!-- <img :src="personInfo.avatar_url" width="50px"> -->
        </div>
        <!-- <input type="file" name="avatar" id="avatar" @change="upload"> -->
        <div class="infobox">
          <div>{{personInfo.nick_name}}</div>
          <div>{{personInfo.phone_number}}</div>
        </div>
        <div class="clearbox"></div>
      </div>
    </div>

    <div class="mytopbannerbox2" @click="toMyBalance()">
      <div class="mytopbannerboxline"></div>
      <div class="left">余额：{{myBalance}}元</div>
    </div>
    <div style="margin-top:10px">
    </div>

    <div class="menu_list">
      <!-- <mt-cell title="我的订单" is-link :to="{ path: 'my-order-list' }"></mt-cell> -->
      <mt-field label="姓名" placeholder="请填写姓名" type="" v-model="personInfo.real_name"></mt-field>
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
      <mt-field label="学历" placeholder="请填写学历" type="" v-model="personInfo.highest_degree"></mt-field>
      <mt-field label="学校" placeholder="请填写学校" type="" v-model="personInfo.school_id"></mt-field>
      <mt-field label="专业" placeholder="请填写专业" type="" v-model="personInfo.major_id"></mt-field>
      <mt-field label="年级" placeholder="请填写年级" type="tel" v-model="personInfo.enroll_year"></mt-field>
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
        birthday: '1988-12-05',
        highest_degree: '',
        school_id: '',
        major_id: '',
        enroll_year: ''
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxPersonals();
  },
  computed: {
    myBalance() {
      return this.toNumber(this.personInfo.balance);
    }
  },
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
      let token = this.$store.state.auth.token;
      console.info(this.personInfo.gender);
      let params = {
        token: token,
        nickname: this.personInfo.nickname,
        phone_number: this.personInfo.phone_number,
        // avatar_url: this.personInfo.avatar_url,
        real_name: this.personInfo.real_name,
        gender: this.personInfo.gender,
        birthday: this.personInfo.birthday,
        highest_degree: this.personInfo.highest_degree,
        school_id: this.personInfo.school_id,
        major_id: this.personInfo.major_id,
        enroll_year: this.personInfo.enroll_year
      };
      Indicator.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.modify, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            Toast({
              message: '信息修改成功',
              position: 'middle',
              duration: 3000
            });
          } else {
            Toast({
              message: '信息修改失败',
              position: 'middle',
              duration: 3000
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
    getAjaxPersonals() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.personals, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          this.personInfo = response.data.data;
          console.info(this.personInfo.gender);
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
    toMyBalance() {
      this.$router.push({
        path: '/my-balance'
      });
    },
    jump(params) {
      this.$router.push({
        path: '/my-order-list/' + params
      });
    },
    receive() {
      console.info(111);
      let params = 'receive';
      this.jump(params);
    },
    sign() {
      let params = 'sign';
      this.jump(params);
    },
    process() {
      let params = 'process';
      this.jump(params);
    },
    over() {
      let params = 'over';
      this.jump(params);
    },
    problem() {
      let params = 'problem';
      this.jump(params);
    }
  }
};
</script>
