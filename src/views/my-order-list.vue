<template>
<div class="my-order-list groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="my-order-list-nav">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="all">全部</mt-tab-item>
        <mt-tab-item id="process">进行中</mt-tab-item>
        <mt-tab-item id="over">已结束</mt-tab-item>
        <mt-tab-item id="problem">问题单</mt-tab-item>
      </mt-navbar>
    </div>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="all">
          <div class="no-date" v-if="orderList==''">
            <i class="iconfont icon-weitongguo myicon"></i>
            暂无数据！
          </div>
          <div class="all-tab-container" ref="kkk" v-for="orderItem in orderList" key="orderItem">
            <mt-cell class="bottom-border" :title="orderItem.create_time">
            </mt-cell>
            <div class="item-con" @click="toTaskDetail(orderItem.task_id)">
              <div class="item-pic">
                <img :src="orderItem.image_url" alt="">
              </div>
              <div class="item-description">
                <div class="item-description-title">
                  <span class="ico-part" v-if="(orderItem.task_type =='0')">兼职</span>
                  <span class="ico-full" v-if="(orderItem.task_type =='1')">全职</span>
                  <span class="ico-fieldwork" v-if="(orderItem.task_type =='2')">实习</span> {{orderItem.name}}
                </div>
                <div class="item-description-intro">
                  <div class="item-description-intro-text introduce">
                    {{orderItem.job_description}}
                  </div>
                  <span class="area">地区：{{orderItem.county_name}}</span>
                  <span class="need">需求：{{orderItem.person_demand}}人</span>
                </div>
              </div>
              <div class="item-price"><span>{{orderItem.salary}}</span>元</div>
            </div>
            <div class="clearbox"></div>
            <div v-if="(orderItem.is_off_shelved == '1')">
              <div class="btn-group">
                <div class="btn-group-inner">
                  <mt-button size="small" plain>已下架</mt-button>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-if="(orderItem.is_cancled=='0')">
                <div class="btn-group">
                  <div class="btn-group-inner">
                    <mt-button size="small" plain @click="cancelTask(orderItem.task_id,orderItem.head_order_id)">取消任务</mt-button>
                    <mt-button size="small" plain style="margin-left:10px;" @click="startHire(orderItem.head_order_id)">查看二维码</mt-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearbox"></div>
            <div v-if="orderItem.talent">
              <div v-if="orderItem.talent.nickname">
                <div class="user-list">
                  <mt-cell :title="orderItem.talent.nickname" class="bottom-border" :value="orderItem.talent.current_status">
                    <img slot="icon" :src="orderItem.talent.avatar_url" width="35" height="35">
                  </mt-cell>
                </div>
              </div>
            </div>

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="process">
          <div class="no-date" v-if="orderList==''">
            <i class="iconfont icon-weitongguo myicon"></i>
            暂无数据！
          </div>
          <!-- <mt-cell title="进行中" /> dddd -->
          <div class="all-tab-container process" v-for="orderItem in orderList" key="orderItem">
            <mt-cell class="bottom-border" :title="orderItem.create_time" value="进行中">
            </mt-cell>
            <div class="item-con" @click="toTaskDetail(orderItem.task_id)">
              <div class="item-pic">
                <img :src="orderItem.image_url" alt="">
              </div>
              <div class="item-description">
                <div class="item-description-title">
                  <span class="ico-part" v-if="(orderItem.task_type =='0')">兼职</span>
                  <span class="ico-full" v-if="(orderItem.task_type =='1')">全职</span>
                  <span class="ico-fieldwork" v-if="(orderItem.task_type =='2')">实习</span> {{orderItem.name}}
                </div>
                <div class="item-description-intro">
                  <div class="item-description-intro-text introduce">
                    {{orderItem.job_description}}
                  </div>
                  <span class="area">地区：{{orderItem.county_name}}</span>
                  <span class="need">需求：{{orderItem.person_demand}}人</span>
                </div>
              </div>
              <div class="item-price"><span>{{orderItem.salary}}</span>元</div>
            </div>
            <div class="clearbox"></div>
            <div v-if="(orderItem.is_off_shelved == '1')">
              <div class="btn-group">
                <div class="btn-group-inner">
                  <mt-button size="small" plain>已下架</mt-button>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-if="(orderItem.is_cancled=='0')">
                <div class="btn-group">
                  <div class="btn-group-inner">
                    <mt-button size="small" plain @click="cancelTask(orderItem.task_id,orderItem.head_order_id)">取消任务</mt-button>
                    <mt-button size="small" plain style="margin-left:10px;" @click="startHire(orderItem.head_order_id)">查看二维码</mt-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearbox"></div>
            <div v-if="orderItem.talent">
              <div v-if="orderItem.talent.nickname">
                <div class="user-list">
                  <mt-cell :title="orderItem.talent.nickname" class="bottom-border" :value="orderItem.talent.current_status">
                    <img slot="icon" :src="orderItem.talent.avatar_url" width="35" height="35">
                  </mt-cell>
                </div>
              </div>
            </div>
            <!-- <div class="user-list">
              <mt-cell :title="orderItem.talent.nickname" class="bottom-border" :value="orderItem.talent.current_status">
                <img slot="icon" :src="orderItem.talent.avatar_url" width="35" height="35">
              </mt-cell>
            </div> -->
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="over">
          <!-- <mt-cell title="已结束" /> -->
          <div class="no-date" v-if="overAndProblemList==''">
            <i class="iconfont icon-weitongguo myicon"></i>
            暂无数据！
          </div>
          <div class="all-tab-container over" v-for="orderItem in overAndProblemList" key="orderItem">
            <mt-cell class="bottom-border" :title="orderItem.create_time" value="已结束">
            </mt-cell>
            <div class="item-con" @click="toTaskDetail(orderItem.task_id)">
              <div class="item-pic">
                <img :src="orderItem.image_url" alt="">
              </div>
              <div class="item-description">
                <div class="item-description-title">
                  <span class="ico-part" v-if="(orderItem.task_type =='0')">兼职</span>
                  <span class="ico-full" v-if="(orderItem.task_type =='1')">全职</span>
                  <span class="ico-fieldwork" v-if="(orderItem.task_type =='2')">实习</span> {{orderItem.name}}
                </div>
                <div class="item-description-intro">
                  <div class="item-description-intro-text introduce">
                    {{orderItem.job_description}}
                  </div>
                  <span class="area">地区：{{orderItem.county_name}}</span>
                  <span class="need">需求：{{orderItem.person_demand}}人</span>
                </div>
              </div>
              <div class="item-price"><span>{{orderItem.salary}}</span>元</div>
            </div>

            <div class="clearbox"></div>
            <!-- <div class="user-list">
              <mt-cell :title="orderItem.user_info.nickname" class="bottom-border">
                <img slot="icon" :src="orderItem.user_info.avatar_url" width="35" height="35">
              </mt-cell>
            </div> -->
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="problem">
          <div class="no-date" v-if="overAndProblemList==''">
            <i class="iconfont icon-weitongguo myicon"></i>
            暂无数据！
          </div>
          <!-- <mt-cell title="问题单" /> -->
          <div class="all-tab-container problem" v-for="orderItem in overAndProblemList" key="orderItem">
            <mt-cell class="bottom-border" :title="orderItem.create_time" value="问题单">
            </mt-cell>
            <div class="item-con" @click="toTaskDetail(orderItem.task_id)">
              <div class="item-pic">
                <img :src="orderItem.image_url" alt="">
              </div>
              <div class="item-description">
                <div class="item-description-title">
                  <span class="ico-part" v-if="(orderItem.task_type =='0')">兼职</span>
                  <span class="ico-full" v-if="(orderItem.task_type =='1')">全职</span>
                  <span class="ico-fieldwork" v-if="(orderItem.task_type =='2')">实习</span> {{orderItem.name}}
                </div>
                <div class="item-description-intro">
                  <div class="item-description-intro-text introduce">
                    {{orderItem.job_description}}
                  </div>
                  <span class="area">地区：{{orderItem.county_name}}</span>
                  <span class="need">需求：{{orderItem.person_demand}}人</span>
                </div>
              </div>
              <div class="item-price"><span>{{orderItem.salary}}</span>元</div>
            </div>

            <div class="clearbox"></div>
            <!-- <div class="user-list">
              <mt-cell :title="orderItem.user_info.nickname" class="bottom-border">
                <img slot="icon" :src="orderItem.user_info.avatar_url" width="35" height="35">
              </mt-cell>
            </div> -->
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/my-order-list.scss';
import {
  Indicator,
  Toast
  // MessageBox
} from 'mint-ui';
export default {
  name: 'page-navbar',
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
      wrapperHeight: 0,
      selected: '1',
      listsHeight: 48,
      isShow: false,
      txt: '展开',
      isDown: true,
      overAndProblemList: {},
      specialParams: {},
      userInfoList: {
        // task: {
        //   image_url: '',
        //   name: '',
        //   task_type: '',
        //   county_name: '',
        //   person_demand: '',
        //   salary: '',
        //   job_description: ''
        // },
        // user_info: {
        //   nickname: '',
        //   avatar_url: ''
        // }
      },
      orderList: {
        // talent: {
        //   nickname: '',
        //   avatar_url: '',
        //   current_status: ''
        // }
      }
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.switchStatus();
  },
  mounted() {
    // console.info(this.$refs.wrapper.getBoundingClientRect());
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - this.$refs.wrapper.getBoundingClientRect().bottom - 10;
  },
  watch: {
    selected: function(val) {
      let token = this.$store.state.auth.token;
      if (val === 'all') {
        // this.apiUrl = this.$store.state.api.order_lists;
        this.specialParams = {
          token: token,
          page: '1'
        }
        this.getAjaxList();
      } else if (val === 'process') {
        this.specialParams = {
          token: token,
          order_going: '1',
          page: '1'
        }
        this.getAjaxList();
      } else if (val === 'over') {
        this.specialParams = {
          token: token,
          order_finishs: '1',
          page: '1'
        }
        this.getAjaxList();
      } else if (val === 'problem') {
        this.specialParams = {
          token: token,
          order_problems: '1',
          page: '1'
        }
        this.getAjaxList();
      }
    }
  },
  methods: {
    toTaskDetail(task_id) {
      this.$router.push({
        path: '/task-detail/' + task_id
        // });
      });
    },
    cancelTask(taskId, headOrderId) {
      // MessageBox.confirm('确认取消该任务吗?').then(action => {
      this.getAjaxCancelTask(taskId, headOrderId);
      // });
    },
    startHire(headOrderId) {
      // console.info(headOrderId);
      // MessageBox.confirm('确认开始招人吗?').then(action => {
      // let task_id = this.$router.currentRoute.params.id;
      let headhunter_order_id = headOrderId;
      this.$router.push({
        path: '/two-code/' + headhunter_order_id
        // });
      });
    },
    // 取消任务
    getAjaxCancelTask(taskId, headOrderId) {
      let token = this.$store.state.auth.token;
      let task_id = taskId;
      let headhunter_order_id = headOrderId;
      let params = {
        token: token,
        task_id: task_id,
        headhunter_order_id: headhunter_order_id
      };
      Indicator.open({
        text: '取消任务中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.head_cancle, params)
        .then(response => {
          Indicator.close();
          // console.info(response);
          // 再次调用接口
          this.getAjaxList();
          // this.taskDetail = response.data.data;
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
    switchStatus() {
      let status = this.$router.currentRoute.params.status;
      // console.info(status);
      this.selected = status.toString();
      let token = this.$store.state.auth.token;
      // console.info(this.selected);
      // if (this.selected === 'all') {
      //   this.apiUrl = this.$store.state.api.order_lists;
      // } else if (this.selected === 'process') {
      //   this.apiUrl = this.$store.state.api.order_going;
      // } else if (this.selected === 'over') {
      //   this.apiUrl = this.$store.state.api.order_finishs;
      // } else if (this.selected === 'problem') {
      //   this.apiUrl = this.$store.state.api.order_problems;
      // }
      if (this.selected === 'all') {
        // this.apiUrl = this.$store.state.api.order_lists;
        this.specialParams = {
          token: token,
          page: '1'
        }
      } else if (this.selected === 'process') {
        this.specialParams = {
          token: token,
          order_going: '1',
          page: '1'
        }
      } else if (this.selected === 'over') {
        this.specialParams = {
          token: token,
          order_finishs: '1',
          page: '1'
        }
      } else if (this.selected === 'problem') {
        this.specialParams = {
          token: token,
          order_problems: '1',
          page: '1'
        }
      }
      // this.getAjaxList();
    },
    getAjaxList() {
      let token = this.$store.state.auth.token;
      // console.info(token);
      let params = this.specialParams;

      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.order_lists, params)
        .then(response => {
          Indicator.close();
          // console.info(response);

          if (this.selected === 'all') {
            this.orderList = response.data.data;
            this.wrapperHeight = 128 * this.orderList.length + 47;
          } else if (this.selected === 'process') {
            this.orderList = response.data.data;
            this.wrapperHeight = 127 * this.orderList.length + 47;
          } else if (this.selected === 'over') {
            this.overAndProblemList = response.data.data;
            this.userInfoList = response.data.data.user_info;
            console.info(this.overAndProblemList);
            console.info(this.userInfoList);
            this.wrapperHeight = 127 * this.overAndProblemList.length + 47;
          } else if (this.selected === 'problem') {
            this.overAndProblemList = response.data.data;
            this.userInfoList = response.data.data.user_info;
            this.wrapperHeight = 127 * this.overAndProblemList.length + 47;
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
    collapse: function() {
      // if (this.isShow) {
      //   this.isShow = false;
      //   this.listsHeight = 48;
      //   this.txt = '展开';
      //   this.isDown = true;
      // } else {
      //   this.isShow = true;
      //   this.listsHeight = this.$refs.lis.getBoundingClientRect().height * this.lists.length;
      //   this.txt = '收起';
      //   this.isDown = false;
      // }

    }
  }
};
</script>
