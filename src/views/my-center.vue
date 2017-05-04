<template>
<div class="my-center groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="mytopbannerbox" @click="myCenterInfo">
      <div class="info">
        <div class="head">
          <img :src="personInfo.avatar_url" width="50px">
        </div>
        <div class="infobox">
          <div>{{personInfo.real_name}}</div>
          <div>{{personInfo.phone_number}}</div>
        </div>
        <div class="ico">
          简历完善度{{perfect_degree}} &nbsp;&nbsp;&nbsp;
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
        <div class="clearbox"></div>
      </div>
    </div>

    <!-- <div class="mytopbannerbox2" @click="myBalance()">
      <div class="mytopbannerboxline"></div>
      <div class="left">余额：{{allBalance}}元</div>
      <div class="right">账户安全保障中 &nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></div>
    </div> -->
    <div class="orderlist">
      <mt-cell title="我的工作" class="bottom-border" is-link :to="{ path: '/my-order-list/all' }"></mt-cell>
      <ul>
        <li @click="process">
          <div class="img">
            <i class="iconfont icon-jinxingzhong middle-icon icon-grey"></i>
            <div class="tips"></div>
          </div>
          <div class="title">进行中</div>
        </li>
        <li @click="over">
          <div class="img">
            <i class="iconfont icon-tongguo middle-icon icon-grey"></i>
          </div>
          <div class="title">已结束</div>
        </li>
        <li @click="problem">
          <div class="img">
            <i class="iconfont icon-dingdanwenti middle-icon icon-grey"></i>
          </div>
          <div class="title">问题单</div>
        </li>
      </ul>
    </div>

    <div class="menu_list">
      <!-- <mt-cell title="我的人才库" is-link :to="{ path: 'humres' }"></mt-cell>
      <mt-cell title="推荐有奖" is-link :to="{ path: 'recommended-prizes' }"></mt-cell> -->
      <mt-cell title="成为猎头" is-link :to="{ path: 'job-become-headhunters' }"></mt-cell>
      <mt-cell title="意见反馈" is-link :to="{ path: 'feedback' }"></mt-cell>
    </div>
    <!-- 补充被tab遮挡的高度 55px -->
    <div style="height:55px"></div>
    <!-- 补充被tab遮挡的高度 55px -->
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/my-center.scss';
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
      personInfo: '',
      perfect_degree: ''
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', false);
    this.getAjaxPersonals();
    this.getAjaxPerfectDegree();
  },
  computed: {
    allBalance() {
      return this.toNumber(this.personInfo.balance);
    }
  },
  methods: {
    toNumber(num) {
      let number = Number(num / 100) || 0;
      return number.toFixed(2); // 保留两位小数
    },
    getAjaxPerfectDegree(){
      let token = this.$store.state.auth.token;
      let params = {
        token: token
      };
      this.axios.post(this.$store.state.api.perfect_degree, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          this.perfect_degree = response.data.data.perfect_degree;
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
    myCenterInfo() {
      this.$router.push({
        path: '/job-talent-pool'
      });
    },
    myBalance() {
      this.$router.push({
        path: '/my-balance'
      });
    },
    jump(params) {
      this.$router.push({
        path: '/my-order-list/' + params
      });
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
