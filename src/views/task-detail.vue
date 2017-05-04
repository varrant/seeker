 <template>
<!-- v-iscroll="iscrollConf" -->
<div class="task-detail groundGray">
  <div class="scoll-layer">
    <div class="listitem itemcur">
      <div class="orderinfoBox">
        <div class="ipt_box3">
          <div class="left mid">
            <div class="title">{{taskDetail.name}}</div>
            <div class="type" v-if="(taskDetail.task_type == '0')">兼职</div>
            <div class="type" v-if="(taskDetail.task_type == '1')">全职</div>
            <div class="type" v-if="(taskDetail.task_type == '2')">实习</div>
            <div class="clearbox"></div>
            <div class="introduce">工作描述：{{taskDetail.job_description}}</div>
            <div class="area">地点：<span>{{taskDetail.county_name}}</span></div>
          </div>
          <!-- <div class="right">
            <div class="ipt_value">{{taskDetail.salary}}元</div>
          </div> -->
          <div class="clearbox"></div>

          <!-- <div class="minrightbox">
            <div class="num">{{taskDetail.recv_cv_times}}</div>
            <div class="img">
            <i class="iconfont icon-shangchuanjianli small-icon icon-grey"></i></div>
            <div class="num">{{taskDetail.view_times}}</div>
            <div class="img">
              <i class="iconfont icon-chakan small-icon icon-grey"></i>
            </div>
            <div class="clearbox"></div>
          </div> -->
        </div>
        <div class="ipt_box4">
          <div>工作时间：{{taskDetail.work_time}}</div>
          <div>上班时段：{{taskDetail.work_schedule}}</div>
        </div>
      </div>

      <div class="orderinfoBox">
        <div class="ipt_box2">
          <div class="left">薪资待遇</div>
          <div class="right">
            <!-- <div class="ipt_value">{{taskDetail.salary}}<span>元/天</span></div> -->
            <div class="ipt_value" v-if="(taskDetail.task_type == '0')">{{taskDetail.salary}}<span>元/天</span></div>
            <div class="ipt_value" v-if="(taskDetail.task_type == '1')">{{taskDetail.salary}}<span>元/月</span></div>
            <div class="ipt_value" v-if="(taskDetail.task_type == '2')">{{taskDetail.salary}}<span>元/月</span></div>
          </div>
          <div class="clearbox"></div>
        </div>
        <div class="ipt_box2">
          <div class="left">招聘人数</div>
          <div class="right">
            <div class="ipt_value">{{taskDetail.person_demand}}人</div>
          </div>
          <div class="clearbox"></div>
        </div>
        <div class="ipt_box2 no-bottom-border">
          <div class="left">工作类型</div>
          <div class="right">
            <div class="ipt_value">{{taskDetail.ftype}}</div>
          </div>
          <div class="clearbox"></div>
        </div>
      </div>
    </div>

    <div class="box" @click="showWork = !showWork">工作描述</div>
    <div class="box-detail" v-if="showWork">
      <p>{{taskDetail.job_description}}</p>
    </div>
    <!-- <transition name="fade">
      <div class="box-detail" v-if="showWork">
        <p>{{taskDetail.job_description}}</p>
      </div>
    </transition> -->
    <div class="box" @click="showDuty = !showDuty">职责要求</div>
    <div class="box-detail" v-if="showDuty">
      <p>{{taskDetail.duty_description}}</p>
    </div>
    <!-- <transition name="fade">
      <div class="box-detail" v-if="showDuty">
        <p>{{taskDetail.duty_description}}</p>
      </div>
    </transition> -->
    <div class="box" @click="showWelfare = !showWelfare">福利待遇</div>
    <div class="box-detail" v-if="showWelfare">
      <p>{{taskDetail.benefits}}</p>
    </div>
    <!-- <transition name="fade">
      <div class="box-detail" v-if="showWelfare">
        <p>{{taskDetail.benefits}}</p>
      </div>
    </transition> -->
    <div class="box">公司介绍</div>
    <div class="box-detail">
      <div class="company-div"><img :src="taskDetail.ficon_url" /></div>
      <div>
        <p class="company-name"><span class="company-title">{{taskDetail.fname}}</span></p>
        <p>
          <span>{{taskDetail.ftype}}</span>
          <span class="type" v-if="(taskDetail.ffinancing == '0')">未融资</span>
          <span class="type" v-if="(taskDetail.ffinancing == '1')">天使轮</span>
          <span class="type" v-if="(taskDetail.ffinancing == '2')">A轮</span>
          <span class="type" v-if="(taskDetail.ffinancing == '3')">B轮</span>
          <span class="type" v-if="(taskDetail.ffinancing == '4')">C轮</span>
          <span class="type" v-if="(taskDetail.ffinancing == '5')">D轮及以上</span>
          <span class="type" v-if="(taskDetail.ffinancing == '6')">上市公司</span>
          <span class="type" v-if="(taskDetail.ffinancing == '6')">不需要融资</span>
          <span>{{taskDetail.fscale}}</span>
        </p>
      </div>
    </div>
    <div class="box-detail">
      <p class="company-addr"><span class="company-address">详细地址:</span>{{taskDetail.faddress}}</p>
    </div>
    <!-- 补充被tab遮挡的高度 55px -->
    <div style="height:55px"></div>
    <!-- 补充被tab遮挡的高度 55px -->
  </div>
  <footer class="nav_bottom">
    <div v-if="(taskDetail.is_off_shelved == '1')">
      <ul>
        <li class="left">
          <div class="kefu">
            <a href="tel:0571-87211611">
              <i class="iconfont icon-kefu myicon"></i>
              <div class="title">客服咨询</div>
            </a>
          </div>
        </li>
        <li class="down">已下架</li>
      </ul>
    </div>
    <div v-else>
      <div v-if="(taskDetail.is_receive=='0')">
        <ul>
          <li class="left">
            <div class="kefu">
              <a href="tel:0571-87211611">
                <i class="iconfont icon-kefu myicon"></i>
                <div class="title">客服咨询</div>
              </a>
            </div>
          </li>
          <li v-if="(taskDetail.is_complete=='1')" class="right" @click="receiveTask">投递简历</li>
          <li v-if="(taskDetail.is_complete=='0')" class="right" @click="toCompletePrifile">完善简历</li>
        </ul>
      </div>
      <div v-if="(taskDetail.is_receive=='1')">
        <ul>
          <li class="left">
            <div class="kefu">
              <a href="tel:0571-87211611">
                <i class="iconfont icon-kefu myicon"></i>
                <div class="title">客服咨询</div>
              </a>
            </div>
          </li>
          <li class="down">已投递简历</li>
        </ul>
      </div>
    </div>


  </footer>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/task-detail.scss';
import {
  MessageBox,
  Toast,
  Indicator
} from 'mint-ui';
// import api from '../constant/api';
// import * as types from '../vuex/mutation-types';
export default {
  name: 'task-detail',
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
      show: false,
      showWork: false,
      showDuty: false,
      showWelfare: false,
      taskDetail: '',
      headhunter_order_id: ''
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    let task_id = this.getUrlVars().task_id;
    let headhunter_task_id = this.getUrlVars().headhunter_task_id;
    let id = this.$router.currentRoute.params.id;
    let token = this.$store.state.auth.token;
    console.info(token);
    if (task_id && headhunter_task_id) {
      let task_id = this.getUrlVars().task_id;
      let headhunter_task_id = this.getUrlVars().headhunter_task_id;
      let params = {
        task_id: task_id,
        headhunter_task_id: headhunter_task_id
      };
      console.info(params);
      this.getTaskDetail(params);
    } else if (id === 'task_id' && token === '') {
      this.$router.push({
        path: '/login'
      });
    } else if (id && token) {
      let token = this.$store.state.auth.token;
      let task_id = this.$router.currentRoute.params.id;
      let params = {
        token: token,
        task_id: task_id
      };
      this.getTaskDetail(params);

    }

  },
  mounted() {
    // this.$store.commit(types.TITLE, 'center');
  },
  methods: {
    getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
        function(m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    },
    getTaskDetail(params) {
      this.getAjaxList(params);
    },
    // 加载详情
    getAjaxList(params) {
      Indicator.open({
        text: '加载详情中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.user_details, params)
        .then(response => {
          Indicator.close();
          console.info(response.data.data);
          this.taskDetail = response.data.data;
          let is_receive = response.data.data.is_receive;
          console.info(response.data.data.headhunter_order_id);
          if (is_receive === '1') {
            this.headhunter_order_id = response.data.data.headhunter_order_id;
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
    // 领取任务
    getAjaxReceiveTask() {
      let token = this.$store.state.auth.token;
      // console.info(token !== null || token !== '');
      if (token !== null || token !== '') {
        this.$router.push({
          path: '/login'
        });
        return;
      }
      let task_id = this.$router.currentRoute.params.id;
      let params = {
        token: token,
        task_id: task_id
      };
      Indicator.open({
        text: '确认投递简历...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.jobhunter_receive, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          // this.taskDetail = response.data.data;
          console.info(response.data.data.headhunter_order_id);
          let headhunter_order_id = response.data.data.headhunter_order_id;
          this.headhunter_order_id = headhunter_order_id;
          // 再次调用接口
          this.getAjaxList();
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
    // 开始招人，生成二维码
    getStartAjax() {
      console.info(this.headhunter_order_id);
      let token = this.$store.state.auth.token;
      let headhunter_order_id = this.headhunter_order_id;
      let params = {
        token: token,
        headhunter_order_id: headhunter_order_id
      };
      Indicator.open({
        text: '开始招人...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.head_receive, params)
        .then(response => {
          Indicator.close();
          console.info(response);
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
    // 取消任务
    getAjaxCancelTask() {
      let token = this.$store.state.auth.token;
      let task_id = this.$router.currentRoute.params.id;
      let headhunter_order_id = this.headhunter_order_id;
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
          console.info(response);
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
    receiveTask() {
      MessageBox.confirm('确认投递简历吗?').then(action => {
        this.getAjaxReceiveTask();
      });
    },
    toCompletePrifile() {
      this.$router.push({
        path: '/job-talent-pool'
      });
    },
    cancelTask() {
      MessageBox.confirm('确认取消该任务吗?').then(action => {
        this.getAjaxCancelTask();
      });
    },
    startHire() {
      MessageBox.confirm('确认开始招人吗?').then(action => {
        // let task_id = this.$router.currentRoute.params.id;
        let headhunter_order_id = this.headhunter_order_id;
        this.$router.push({
          path: '/two-code/' + headhunter_order_id
        });
      });
    }
  }
};
</script>
