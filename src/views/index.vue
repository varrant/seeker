<template>
<div class="index groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in carouselList" key="item">
          <a :href="item.link"><img :src="item.img_url" width="100%" /></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="index_nav">
      <ul>
        <li @click.prevent="getPartTime()">
          <i class="iconfont icon-hulianwang middle-icon icon-blue"></i>
          <h3>兼职</h3>
        </li>
        <li @click.prevent="getPractice()">
          <i class="iconfont icon-sheji middle-icon icon-green"></i>
          <h3>实习</h3>
          <!-- <mt-button @click.native.prevent="getPractice()">
            <img src="../images/group-16.png" width="40" />
            <h3>实习</h3>
          </mt-button> -->
        </li>
        <li @click.prevent="getFullTime()">
          <i class="iconfont icon-zhaopin middle-icon icon-yellow"></i>
          <h3>全职</h3>
        </li>
      </ul>
    </div>
    <div class="index_list">
      <div class="list_top">
        <h3>你可能感兴趣的</h3>
        <a href="javascript:void(0);" @click="toTaskList()">更多<img src="../images/icon_3.png" /></a>
      </div>
      <div class="list_li" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active">
          <mt-tab-container-item id="tab-container1">
            <ul title="tab-container 1">
              <li v-for="partItem in partList" key="partItem" @click="toTaskDetail(partItem)">
                <div class="list_word">
                  <div class="list_img"><img :src="partItem.image_url" width="100%" /></div>
                  <h3><span class="ico-part">兼职</span>{{partItem.name}}<span class="price">{{partItem.salary}}元/天</span></h3>
                  <p class="introduce">{{partItem.job_description}}</p>
                  <div class="list_num">
                    <span>需求：{{partItem.person_demand}}人</span>
                    <div class="list_view">
                      <a href="javascript:void(0);">
                        <i class="iconfont icon-shangchuanjianli small-icon icon-grey"></i> {{partItem.recv_cv_times}}
                      </a>
                      <a href="javascript:void(0);">
                        <i class="iconfont icon-chakan small-icon icon-grey"></i> {{partItem.view_times}}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <ul title="tab-container 2">
              <li v-for="practiceItem in practiceList" key="practiceItem" @click="toTaskDetail(practiceItem)">
                <div class="list_word">
                  <div class="list_img"><img :src="practiceItem.image_url" width="100%" /></div>
                  <h3><span class="ico-fieldwork">实习</span>{{practiceItem.name}}<span class="price">{{practiceItem.salary}}元/月</span></h3>
                  <p class="introduce">{{practiceItem.job_description}}</p>
                  <div class="list_num">
                    <span>需求：{{practiceItem.person_demand}}人</span>
                    <div class="list_view">
                      <a href="javascript:void(0);">
                        <i class="iconfont icon-shangchuanjianli small-icon icon-grey"></i> {{practiceItem.recv_cv_times}}
                      </a>
                      <a href="javascript:void(0);">
                        <i class="iconfont icon-chakan small-icon icon-grey"></i> {{practiceItem.view_times}}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container3">
            <ul title="tab-container 3">
              <li v-for="fullTimeItem in fullTimeList" key="fullTimeItem" @click="toTaskDetail(fullTimeItem)">
                <div class="list_word">
                  <div class="list_img"><img :src="fullTimeItem.image_url" width="100%" /></div>
                  <h3><span class="ico-full">全职</span>{{fullTimeItem.name}}<span class="price">{{fullTimeItem.salary}}元/月</span></h3>
                  <p class="introduce">{{fullTimeItem.job_description}}</p>
                  <div class="list_num">
                    <span>需求：{{fullTimeItem.person_demand}}人</span>
                    <div class="list_view">
                      <a href="javascript:void(0);">
                        <i class="iconfont icon-shangchuanjianli small-icon icon-grey"></i> {{fullTimeItem.recv_cv_times}}
                      </a>
                      <a href="javascript:void(0);">
                        <i class="iconfont icon-chakan small-icon icon-grey"></i> {{fullTimeItem.view_times}}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <!-- 补充被tab遮挡的高度 55px -->
    <div style="height:55px"></div>
    <!-- 补充被tab遮挡的高度 55px -->
  </div>

</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/index.scss';
// import * as types from '../vuex/mutation-types';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: '',
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
      carouselList: [],
      wrapperHeight: 0,
      scollTops: 0,
      start: 0,
      move: 0,
      store: 0,
      active: 'tab-container1',
      partList: [],
      practiceList: [],
      fullTimeList: [],
      allList: []
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', false);
    this.getCarouselList();
    this.getPartTime();
    // this.getPractice();
    // this.getFullTime();
  },
  methods: {
    toTaskList(item) {
      console.info(item);
      // this.$store.commit('SET_PARAMS_IBID', item);
      this.$router.push({
        path: '/task-list'
      });
    },
    toTaskDetail(item) {
      // console.info(item);
      this.$store.commit('SET_TASK_ID', item.id);
      this.$router.push({
        path: '/task-detail/' + item.id
      });
    },
    getCarouselList() {
      this.axios.post(this.$store.state.api.carousel)
        .then(response => {
          this.carouselList = response.data.data;
        }).catch(function(error) {
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 5000
          });
        });
    },
    getAjaxList(typeList, params) {
      Indicator.open({
        text: '加载职位中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          Indicator.close();
          if (typeList === 'partList') {
            this.partList = response.data.data;
            this.wrapperHeight = 93 * this.partList.length;
          } else if (typeList === 'practiceList') {
            this.practiceList = response.data.data;
            this.wrapperHeight = 93 * this.practiceList.length;
          } else if (typeList === 'fullTimeList') {
            this.fullTimeList = response.data.data;
            this.wrapperHeight = 93 * this.fullTimeList.length;
          }

          // else {
          //   this.allList = response.data.data;
          // }

        }).catch(function(error) {
          console.log(error);
          Indicator.close();
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    },
    getAll() {
      this.active = 'tab-container0';
      let params = {};
      this.getAjaxList(params);
    },
    getPartTime() {
      this.active = 'tab-container1';
      let params = {
        task_type: 0
      };
      this.getAjaxList('partList', params);
    },
    getPractice() {
      this.active = 'tab-container2';
      let params = {
        task_type: 2
      };
      this.getAjaxList('practiceList', params);
    },
    getFullTime() {
      this.active = 'tab-container3';
      let params = {
        task_type: 1
      };
      this.getAjaxList('fullTimeList', params);
    }
  }
};
</script>
