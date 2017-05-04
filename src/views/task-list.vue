<template>
<div class="task-list groundGray">
  <div class="index_nav task-list-nav" @touchmove="touchMove">
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
  <div class="page-loadmore-wrapper index_list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :style="{ height: mintLoadmoreHeight }">
      <ul class="page-loadmore-list">
        <div v-if="item.is_off_shelved=='0'" v-for="item in allList" key="item" @click="toTaskDetail(item)">
          <li>
            <div class="list_word">
              <div class="list_img"><img :src="item.image_url" width="100%" /></div>
              <h3>
            <span class="ico-part" v-if="(item.task_type =='0')">兼职</span>
            <span class="ico-full" v-if="(item.task_type =='1')">全职</span>
            <span class="ico-fieldwork" v-if="(item.task_type =='2')">实习</span>
            {{item.name}}
            <!-- <span class="price">{{item.commission}}元</span> -->
          </h3>
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
        </div>
        <!-- <li v-for="item in allList" class="page-loadmore-listitem" @click="toTaskDetail(item)">{{ item }}</li> -->
      </ul>
      <div :class="noMoreDate ? '':'bottom-arrow-hide'" style="text-align:center;margin-bottom:20px;font-size:16px;color:#9b9b9b">没有更多了!</div>
    </mt-loadmore>
  </div>
  <!-- 补充被tab遮挡的高度 65px -->
  <div style="height:75px; background-color: #eee;"></div>
  <!-- 补充被tab遮挡的高度 65px -->
</div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/task-list.scss';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'task-list',
  data() {
    return {
      taskType: '',
      countyId: '',
      sortType: '',
      allList: [],
      allLoaded: false,
      mintLoadmoreHeight: '',
      wrapperHeight: 0,
      bottomStatus: '',
      topStatus: '',
      pg: 1,
      maxPg: 0,
      isNextPage: '',
      isnocontent: true,
      missonListMoreThanTen: false,
      noMoreDate: false,
      list: []
    };
  },
  mounted() {
    console.info(this.$refs.wrapper.getBoundingClientRect());
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - this.$refs.wrapper.getBoundingClientRect().bottom - 10;
  },
  created() {
    this.$store.dispatch('tabSwitcher', false);
    this.getAllTime();
  },
  methods: {
    loadTop() {
      this.refresh();
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      this.loadMore();
    },
    // 下拉刷新功能
    refresh() {
      console.info('refresh');
      this.noMoreDate = false;
      this.allLoaded = false;
      this.pg = 1;
      this.taskType = '';
      this.countyId = '';
      this.sortType = '';
      let params = {
        page: this.pg,
        task_type: this.taskType || '',
        county_id: this.countyId || '',
        sort_type: this.sortType || ''
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          console.info(response);
          setTimeout(() => {
            Indicator.close();
            this.allList = response.data.data;
            this.$refs.loadmore.onTopLoaded();
          }, 1000);
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
    loadMore() {
      this.noMoreDate = false;
      console.info('koko');
      let params = {
        page: this.pg,
        task_type: this.taskType || '',
        county_id: this.countyId || '',
        sort_type: this.sortType || ''
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      console.info('this.pg', this.pg);
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          console.info(response);
          console.info('dodo');
          // this.allList = response.data.data;
          // 是否加载完全，如果加载完全隐藏
          this.isNextPage = response.data.isNextPage;
          console.info(this.allList);
          console.info(this.isNextPage);
          if (this.isNextPage === '1') {
            console.info('coco');
            setTimeout(() => {
              Indicator.close();
              this.allList = this.allList.concat(response.data.data);
              this.pg++;
              this.$refs.loadmore.onBottomLoaded();
            }, 1000);
          } else if (this.isNextPage === '0') {
            console.info('momo');
            setTimeout(() => {
              Indicator.close();
              this.noMoreDate = true;
              this.allLoaded = true;
              this.$refs.loadmore.onBottomLoaded();
            }, 1000);
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

    selectTaskType: function() {
      // let params = {
      //   task_type: this.taskType || '3',
      //   page: 1
      // };
      this.getAjaxList();
    },
    selectCountyId: function() {
      // let params = {
      //   county_id: this.countyId || '',
      //   page: 1
      // };
      this.getAjaxList();
    },
    selectSortType: function() {
      // let params = {
      //   sort_type: this.sortType || '',
      //   page: 1
      // };
      this.getAjaxList();
    },
    touchMove: function(evt) {
      evt.preventDefault();
    },
    toTaskDetail(item) {
      // console.info(item);
      this.$store.commit('SET_TASK_ID', item.id);
      this.$router.push({
        path: '/task-detail/' + item.id || 'task_id'
      });
    },
    getAllTime() {
      this.getAjaxList();
    },
    getAjaxList() {
      let params = {
        page: this.pg || 1,
        task_type: this.taskType || '',
        county_id: this.countyId || '',
        sort_type: this.sortType || ''
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.taks_lists, params)
        .then(response => {
          console.info(response);
          this.allList = response.data.data;
          Indicator.close();
          // 计算高度 ，如果高度大于实际的高度的话，就把mintLoadmoreHeight设为自动的。
          // let innerHight = (this.allList.length) * 93;
          // console.info(innerHight);
          // console.info(this.wrapperHeight);
          // this.mintLoadmoreHeight = 'auto';
          // if (innerHight >= this.wrapperHeight) {
          //   this.mintLoadmoreHeight = 'auto';
          // } else {
          //   this.mintLoadmoreHeight = document.documentElement.clientHeight;
          // }
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


<style lang='scss' rel="stylesheet/scss" type="text/css">
.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px;
    &:last-of-type {
        border-bottom: solid 1px #eee;
    }
}

.page-loadmore-listitem {
    display: block;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
    &:first-child {
        border-top: solid 1px #eee;
    }
}

.page-loadmore-wrapper {
    z-index: 10;
    overflow: scroll;
}

.mint-loadmore-bottom {
    span {
        display: inline-block;
        transition: 0.2s linear;
        vertical-align: middle;
        .is-rotate {
            transform: rotate(180deg);
        }
    }
}
.bottom-arrow-hide {
    display: none;
}
</style>

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
