<template>
<div class="product-list">
  <img class="public-banner mb20" src="../images/product-banner.jpg">
  <div class="group" v-for="(list, index) in lists">
    <div class="head">
      <div class="pull-left">
        <span class="public-triangle product-name">{{list.name}}</span>
      </div>
      <div class="pull-right" @click="jump(index)">
        <span>详情</span><i></i>
      </div>
    </div>
    <p class="description">{{list.overview}}</p>
    <div class="pubilc-introduction">
      <div class="row">
        <div class="item">申请额度：{{list.amount}}</div>
        <div class="item">项目期限：{{list.timelimits}}</div>
      </div>
      <div class="row">
        <div class="item">放款速度：{{list.speed}}</div>
        <div class="item">还款方式：{{list.repayMethod}}</div>
      </div>
    </div>
  </div>

  <publicFooter></publicFooter>
</div>
</template>

<script type="text/babel">
import '../styles/sass/index.scss';
let details = require('../data/details.json');
// let config = require('../data/config.json');
export default {
  data() {
    return {
      lists: ''
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.lists = details.product;
      // let url = 'http://test-api.91suzhi.com/V1/notifications/SMSs';
      console.info(this.$http.post);
      // this.$http.post(baseUrl + 'V1/notifications/SMSs', {
      //   phone: '15088619814',
      //   type: '1'
      // }).then(response => {
      //   // success callback
      //   console.log(response);
      // }, response => {
      //   // error callback
      // });
      // axios.get('static/data.json').then((res) => {
      //   this.seller = res.data.seller
      // });
    },
    jump(index) {
      this.$router.push({
        path: '/details/' + index
      });
    }
  }
};
</script>
