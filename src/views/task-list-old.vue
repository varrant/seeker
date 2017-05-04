<template>
<div class="task-list groundGray" @touchmove="touchMove">
  <div class="index_nav task-list-nav">
    <ul>
      <li>
        <select v-model="taskType" @change="selectTaskType">
            <option value="">类型</option>
            <option value="0">兼职</option>
            <option value="1">全职</option>
            <option value="2">实习</option>
          </select>
      </li>
      <li>
        <select v-model="countyId" @change="selectCountyId">
            <option value="">区域</option>
            <option value="1">上城区</option>
            <option value="2">下城区</option>
            <option value="3">江干区</option>
            <option value="4">拱墅区</option>
            <option value="5">西湖区</option>
            <option value="6">滨江区</option>
            <option value="7">萧山区</option>
            <option value="8">余杭区</option>
            <option value="9">富阳区</option>
          </select>
      </li>
      <li>
        <select v-model="sortType" @change="selectSortType">
            <option value="">时间排序</option>
            <option value="0">时间升序</option>
            <option value="1">时间降序</option>
          </select>
      </li>
    </ul>
  </div>
  <div class="scoll-layer special-bg">
    <div class="index_list">
      <!-- :style="{height: taskListHeight + 'px'}" -->
      <div class="list_li">
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
          <!-- <div v-for="(item, index) in items" @click="onItemClick(index, item)" class="row" :class="{'grey-bg': index % 2 == 0}">
            {{ item }}
          </div> -->
          <ul>
            <li v-for="item in allList" key="item" @click="toTaskDetail(item)">
              <div class="list_word">
                <div class="list_img"><img :src="item.image_url" width="100%" /></div>
                <h3>
              <span class="ico-part" v-if="(item.task_type =='0')">兼职</span>
              <span class="ico-full" v-if="(item.task_type =='1')">全职</span>
              <span class="ico-fieldwork" v-if="(item.task_type =='2')">实习</span>
              {{item.name}}<span class="price">{{item.commission}}元</span></h3>
                <p class="introduce">{{item.job_description}}</p>
                <div class="list_num">
                  <span>需求：{{item.person_demand}}人</span>
                  <div class="list_view">
                    <a href="javascript:void(0);">
                      <i class="iconfont icon-shangchuanjianli small-icon icon-grey"></i> {{item.recv_cv_times}}
                    </a>
                    <a href="javascript:void(0);">
                      <i class="iconfont icon-chakan small-icon icon-grey"></i> {{item.view_times}}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </scroller>

      </div>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/task-list.scss';
import Scroller from 'vue-scroller';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'task-list',
  components: {
    Scroller
  },
  data() {
    return {
      taskType: '',
      countyId: '',
      sortType: '',
      allList: [],
      isNextPage: '',
      taskListHeight: 0,
      pg: 1
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', false);
    // this.getAllTime();
  },
  mounted() {
    this.infinite();
  },
  methods: {
    // 下拉刷新功能
    refresh() {
      console.info(111);
      let params = {
        page: 1
      };
      console.info(this.pg);
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          console.info(response);
          this.allList = response.data.data;
          if (this.$refs.my_scroller) {
            this.$refs.my_scroller.finishPullToRefresh();
          }
        }).catch(function(error) {
          console.log(error);
          Toast({
            message: '连接失败！',
            position: 'middle',
            duration: 3000
          });
        });
    },
    // 上拉加载更多功能
    infinite() {
      console.info('koko');
      console.info(this.pg);
      let params = {
        page: this.pg
      };
      console.info(params);
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          console.info('dodo');
          this.isNextPage = response.data.isNextPage;
          console.info('this.isNextPage' + this.isNextPage);
          if (this.isNextPage === '1') {
            if (this.pg === 1) {
              console.info('this.isNextPage' + 222);
              this.allList = response.data.data;
              this.pg++;
              setTimeout(() => {
                this.$refs.my_scroller.resize();
              }, 1000);
            } else {
              this.allList = this.allList.concat(response.data.data);
              console.info('this.isNextPage' + 333);
              this.pg++;
              this.$refs.my_scroller.finishInfinite();
            }
          } else if (this.isNextPage === '0') {
            console.info('this.isNextPage' + 444);
            this.allList = this.allList.concat(response.data.data);
            this.$refs.my_scroller.finishInfinite(true);
          }
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

    selectTaskType: function() {
      let params = {
        task_type: this.taskType || '3',
        page: 1
      };
      this.getAjaxList(params);
    },
    selectCountyId: function() {
      let params = {
        county_id: this.countyId || '',
        page: 1
      };
      this.getAjaxList(params);
    },
    selectSortType: function() {
      let params = {
        sort_type: this.sortType || '',
        page: 1
      };
      this.getAjaxList(params);
    },
    touchMove: function(evt) {
      evt.preventDefault();
    },
    toTaskDetail(item) {
      // console.info(item);
      this.$store.commit('SET_TASK_ID', item.id);
      this.$router.push({
        path: '/task-detail/' + item.id
      });
    },
    getAllTime() {
      let params = {
        page: 1
      };
      this.getAjaxList(params);
    },
    getAjaxList(params) {
      Indicator.open({
        text: '加载职位中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          console.info(response);
          this.allList = response.data.data;

          Indicator.close();
          // 是否加载完全，如果加载完全隐藏
        }).catch(function(error) {
          console.log(error);
          Indicator.close();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
.task-list-nav {
    position: relative;
}
.scoll-layer {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    top: 40px;
    overflow: hidden;
}
</style>
