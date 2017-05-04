<template>
<div class="job-talent-pool groundGray" v-iscroll="iscrollConf">
  <div class="scoll-layer">
    <div class="item">
      <img class="img-person" src="../images/head1.png">
      <!-- <span class="person-name">suzhi2</span> -->
      <span class="preview" @click="toPreview">
        <div v-if="preview==false">预览</div>
        <div v-if="preview==true">退出预览</div>
    </span>
    </div>
    <div class="mt10">
      <div class="item border-bot text-center">
        基本信息（必填）
      </div>
      <div v-if="personInfo">
        <div class="special-bg">
          <div class="basic-info">
            <span>昵称:{{personInfo.nickname}}</span>
            <span>性别:
            <div v-if="personInfo.gender=='1'">男</div>
            <div v-if="personInfo.gender=='0'">女</div>
          </span>
            <span>出生年份:{{personInfo.birthday}}</span>
            <span>最高学历:
            <div v-if="personInfo.highest_degree=='0'">小学</div>
            <div v-if="personInfo.highest_degree=='1'">初中</div>
            <div v-if="personInfo.highest_degree=='2'">高中</div>
            <div v-if="personInfo.highest_degree=='3'">大专</div>
            <div v-if="personInfo.highest_degree=='4'">本科</div>
            <div v-if="personInfo.highest_degree=='5'">硕士</div>
            <div v-if="personInfo.highest_degree=='6'">博士</div>
            <div v-if="personInfo.highest_degree=='7'">博士后</div>
          </span>
            <span>工作年限:{{personInfo.work_year}}</span>
            <span>所在城市:{{personInfo.city_name}}</span>
            <span>联系电话:{{personInfo.phone_number}}</span>
            <span>联系邮箱:{{personInfo.work_email}}</span>
          </div>
          <div class="clearbox"></div>
        </div>
      </div>

      <div v-if="preview==false">
        <div class="item text-center">
          <span v-if="personInfo" class="btn-edit" @click="toPerfectResume">修改基本信息</span>
          <span v-if="!personInfo" class="btn-edit" @click="toPerfectResume">添加基本信息</span>
        </div>
      </div>
    </div>
    <div class="mt10">
      <div class="item border-bot text-center">工作经历</div>
      <div v-show="workExp!=''">
        <div class="item border-bot">
          <div class="experience">
            <div class="experience-list" v-for="workItem in workExp" key="workItem">
              <div class="experience-list-title">
                {{workItem.end_time}} {{workItem.firm_name}}
                <div v-if="preview==false">
                  <span class="edit" @click='editWork(workItem.work_id)'>编辑</span>
                </div>

              </div>
              <div class="experience-list-con">
                <span>
                {{workItem.occupation}}
              </span>
                <span>
                {{workItem.content}}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="preview==false">
        <div class="item text-center">
          <span class="btn-edit" @click="toPerfectWorkExp">添加工作经历</span>
        </div>
      </div>
    </div>

    <div class="mt10">
      <div class="item border-bot text-center">
        教育经历（必填）
      </div>
      <div v-if="eduBg !=''">
        <div class="item border-bot">
          <div class="experience">
            <div class="experience-list" v-for="eduItem in eduBg" key="eduItem">
              <div class="experience-list-title">
                {{eduItem.end_time}}毕业 {{eduItem.school_name}}
                <div v-if="preview==false">
                  <span class="edit" @click='editEdu(eduItem.education_id)'>编辑</span>
                </div>
              </div>
              <div class="experience-list-con">
                <span>
              <div v-if="eduItem.degree=='0'">小学</div>
              <div v-if="eduItem.degree=='1'">初中</div>
              <div v-if="eduItem.degree=='2'">高中</div>
              <div v-if="eduItem.degree=='3'">大专</div>
              <div v-if="eduItem.degree=='4'">本科</div>
              <div v-if="eduItem.degree=='5'">硕士</div>
              <div v-if="eduItem.degree=='6'">博士</div>
              <div v-if="eduItem.degree=='7'">博士后</div>
              {{eduItem.major}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="preview==false">
        <div class="item text-center">
          <span class="btn-edit" @click="toPerfectEduExp">添加教育经历</span>
        </div>
      </div>

    </div>


    <div class="mt10">
      <div class="item border-bot text-center">
        项目经历
      </div>
      <div v-if="projectExp!=''">
        <div class="item border-bot">
          <div class="experience">
            <div class="experience-list" v-for="projectItem in projectExp" key="projectItem">
              <div class="experience-list-title">
                {{projectItem.end_time}} {{projectItem.project_name}}
                <div v-if="preview==false">
                  <span class="edit" @click='editProject(projectItem.project_id)'>编辑</span>
                </div>
              </div>
              <div class="experience-list-con">
                <span>
                {{projectItem.responsibility}}
              </span>
                <span>
                {{projectItem.project_url}}
              </span>
                <span>
                {{projectItem.description}}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="preview==false">
        <div class="item text-center">
          <span class="btn-edit" @click="toPerfectProjectExp">添加项目经历</span>
        </div>
      </div>
    </div>

    <!-- <div class="mt10">
    <div class="item border-bot text-center">
    技能标签
    </div>
    <div class="item text-center">
      <span class="btn-edit" @click="toPerfectWorkExp">编辑完善</span>
    </div>
  </div> -->

    <div class="mt10">
      <div class="item border-bot text-center">
        期望工作（必填）
      </div>
      <div v-if="jobIntention">
        <div class="special-bg">
          <div class="basic-info">
            <span>城市：{{jobIntention.city}}</span>
            <span>工作类型：
            <div v-if="jobIntention.job_type=='0'">兼职</div>
            <div v-if="jobIntention.job_type=='1'">全职</div>
            <div v-if="jobIntention.job_type=='2'">实习</div>
          </span>
            <span>工作职位：{{jobIntention.occupation}}</span>
            <span>期望薪酬：{{jobIntention.wage_lower}} ~{{jobIntention.wage_upper}} 元 </span>
          </div>
          <div class="clearbox"></div>
        </div>
      </div>
      <div v-if="preview==false">
        <div class="item text-center">
          <span v-if="!jobIntention" class="btn-edit" @click="toAddHopeWork">添加期望工作</span>
          <span v-if="jobIntention" class="btn-edit" @click="toEditHopeWork">修改期望工作</span>
        </div>
      </div>
    </div>
    <div class="mt10">
      <div class="item border-bot text-center">
        自我描述
      </div>
      <div v-if="selfIntro">
        <div class="special-bg">
          <div class="basic-info">
            <span>{{selfIntro.content}}</span>
          </div>
          <div class="clearbox"></div>
        </div>
      </div>
      <div v-if="preview==false">
        <div class="item text-center">
          <span v-if="!selfIntro" class="btn-edit" @click="toAddSelfInfo">添加自我描述</span>
          <span v-if="selfIntro" class="btn-edit" @click="toEditSelfInfo">修改自我描述</span>
        </div>
      </div>
    </div>
    <button class="btn_login_over" @click="toHome">返回首页</button>
  </div>
</div>
</template>

<script type="application/ecmascript">
import '../styles/sass/job-talent-pool.scss';
import {
  Toast,
  Indicator
} from 'mint-ui';
export default {
  name: 'job-talent-pool',
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
        work_year: '',
        phone_number: '',
        city_name: '',
        work_email: ''
      },
      preview: false,
      selfIntro: {
        content: '',
        self_intro_id: ''
      },
      eduBg: [],
      jobIntention: {
        occupation: '',
        job_type: '0',
        city: '',
        wage_lower: '',
        wage_upper: '',
        job_id: ''
      },
      projectExp: {
        project_name: '',
        responsibility: '',
        start_time: '',
        end_time: '',
        description: '',
        project_url: '',
        project_id: ''
      },
      workExp: ''
    };
  },
  created() {
    this.$store.dispatch('tabSwitcher', true);
    this.getAjaxPreview(); // 获取个人信息
  },
  methods: {

    toPreview() {
      console.info('preview');
      if (!this.preview) {
        this.preview = true;
      } else {
        this.preview = false;
      }
    },
    getAjaxPreview() {
      let token = this.$store.state.auth.token;
      let params = {
        token: token
      };
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.axios.post(this.$store.state.api.preview, params)
        .then(response => {
          Indicator.close();
          console.info(response);
          let succeed = response.data.status.succeed;
          if (succeed === '1') {
            this.personInfo = response.data.data.user_info;
            console.info(this.personInfo);
            this.eduBg = response.data.data.edu_background;
            this.jobIntention = response.data.data.job_intention;
            this.projectExp = response.data.data.project_experience;
            // this.personInfo = response.data.data.skill_tag;
            this.workExp = response.data.data.work_experience;
            console.info(this.workExp);
            this.selfIntro = response.data.data.self_intro;
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
    toHome() {
      this.$router.push({
        path: '/'
      });
    },
    toPerfectResume() {
      this.$router.push({
        path: '/job-resume'
      });
    },

    toPerfectEduExp() {
      this.$router.push({
        path: '/job-edu-exp/' + 'education_id'
      });
    },
    editEdu(education_id) {
      this.$router.push({
        path: '/job-edu-exp/' + education_id
      });
    },
    toPerfectWorkExp() {
      this.$router.push({
        path: '/job-work-exp/' + 'work_id'
      });
    },
    editWork(work_id) {
      this.$router.push({
        path: '/job-work-exp/' + work_id
      });
    },
    toPerfectProjectExp() {
      this.$router.push({
        path: '/job-project-exp/' + 'project_id'
      });
    },
    editProject(project_id) {
      this.$router.push({
        path: '/job-project-exp/' + project_id
      });
    },
    toAddHopeWork() {
      this.$router.push({
        path: '/job-hope-work/' + 'job_id'
      });
    },
    toEditHopeWork() {
      this.$router.push({
        path: '/job-hope-work/' + this.jobIntention.job_id
      });
    },
    toAddSelfInfo() {
      this.$router.push({
        path: '/job-self-intro/' + 'self_intro_id'
      });
    },
    toEditSelfInfo() {
      this.$router.push({
        path: '/job-self-intro/' + this.selfIntro.self_intro_id
      });
    }
  }
};
</script>
