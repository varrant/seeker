<template>
<div class="job-person-center groundGray">
    <div class="order_center">
      <ul>
        <li>
          <div class="order_center_main">
            <div class="order_center_main_word">
              <h3><span class="full">全职</span>物流拣货员</h3>
              <p>地区：西湖区<span>需求：10人</span></p>
            </div>
            <span>600元</span>
          </div>
          <div class="list_boder"></div>
          <div class="orderinfoBox">
            <div class="ipt_box4">
              <div class="container">
                <div class="left">
                  <div class="head"><img src="../images/head1.png" alt=""></div>
                </div>
                <div class="name">
                  suzhi1
                </div>
                <div class="clearbox"></div>
                <div class="list_boder"></div>
              </div>
            </div>
          </div>

        </li>
      </ul>
  </div>
  <div class="item">
    <div class="experience">
      <div class="experience-list">
        <div class="experience-list-title">
          求职者报名
          <span class="post">1月3日 11:15</span>
        </div>
        <div class="experience-list-con">
          请耐心等待企业确认
        </div>
      </div>
      <div class="experience-list">
        <div class="experience-list-title">
          求职者报名
          <span class="post">1月3日 11:15</span>
        </div>
        <div class="experience-list-con">
          请耐心等待企业确认
        </div>
      </div>
      <div class="experience-list experience-list-green">
        <div class="experience-list-title">
          订单结束
          <span class="post">1月3日 11:15</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/job-person-center.scss';
// import * as types from '../vuex/mutation-types';

export default {
  name: '',
  data() {
    return {
      
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
  },
  methods: {
   
  }
};
</script>
