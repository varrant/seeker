<template>
<div class="product-details">
  <div class="public-title mt0">{{item.name}}</div>
  <p class="details-p mt10">{{item.overview}}</p>
  <div class="pubilc-introduction">
    <div class="row">
      <div class="item">申请额度：{{item.amount}}</div>
      <div class="item">项目期限：{{item.timelimits}}</div>
    </div>
    <div class="row">
      <div class="item">放款速度：{{item.speed}}</div>
      <div class="item">还款方式：{{item.repayMethod}}</div>
    </div>
  </div>
  <p class="mt20">业务范围：<span class="details-p">{{item.businessScope}}</span></p>
  <p class="mt20">申请条件：</p>
  <p class="details-p mt10" v-html="item.condition"></p>
  <p class="mt20">申请资料：</p>
  <p class="details-p mt10" v-html="item.information"></p>
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
      lists: '',
      id: '',
      item: {}
    };
  },
  created() {
    this.fetchData();
    document.documentElement.scrollTop = 0;
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id;
      this.lists = details.product;
      let _id = this.id;
      let _item = null;
      this.lists.map(function(currentValue, index, arr) {
        if (currentValue.id === _id) {
          _item = currentValue;
        }
      });
      this.item = _item;

    }
  }
};
</script>
