// export default [{
//   path: '/',
//   name: '产品列表',
//   component: require('./views/product-list.vue')
// },
// {
//   path: '/details/:id',
//   name: '产品详情',
//   component: require('./views/product-details.vue')
// }];

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import * as types from './vuex/mutation-types';
import Index from './views/index.vue';
import Login from './views/login.vue';
import Test from './views/test.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: '/',
  component: Index
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/test',
  name: 'test',
  component: Test
}, {
  path: '/center',
  name: '个人中心',
  meta: {
    requireAuth: true
  },
  component: require('./views/center')
}, {
  path: '/register',
  name: 'register',
  component: require('./views/register')
}, {
  path: '/register1',
  name: 'register-step1',
  component: require('./views/register-step1')
}, {
  path: '/register2',
  name: 'register-step2',
  component: require('./views/register-step2')
}, {
  path: '/register3',
  name: 'register-step3',
  component: require('./views/register-step3')
}, {
  path: '/feedback',
  name: '意见反馈',
  meta: {
    requireAuth: true
  },
  component: require('./views/feedback')
}, {
  path: '/humres',
  name: '我的人才库哦',
  meta: {
    requireAuth: true
  },
  component: require('./views/humres')
}, {
  path: '/my-balance',
  name: '我的余额',
  meta: {
    requireAuth: true
  },
  component: require('./views/my-balance')
}, {
  path: '/my-center',
  name: '我的',
  meta: {
    requireAuth: true
  },
  component: require('./views/my-center')
}, {
  path: '/my-center-info',
  name: '我的信息',
  meta: {
    requireAuth: true
  },
  component: require('./views/my-center-info')
}, {
  path: '/my-center-cash',
  name: '余额提现',
  meta: {
    requireAuth: true
  },
  component: require('./views/my-center-cash')
}, {
  path: '/my-center-cash-set',
  name: '提现设置',
  meta: {
    requireAuth: true
  },
  component: require('./views/my-center-cash-set')
}, {
  path: '/my-order-list/:status',
  name: '我的订单',
  meta: {
    requireAuth: true
  },
  component: require('./views/my-order-list')
}, {
  path: '/pay-deposit',
  name: '缴纳保证金',
  meta: {
    requireAuth: true
  },
  component: require('./views/pay-deposit')
}, {
  path: '/recommended-prizes',
  name: '推荐有奖',
  meta: {
    requireAuth: true
  },
  component: require('./views/recommended-prizes')
}, {
  path: '/talent-pool',
  name: '人才库',
  meta: {
    requireAuth: true
  },
  component: require('./views/talent-pool')
}, {
  path: '/task-list',
  name: '工作',
  component: require('./views/task-list')
}, {
  path: '/task-detail/:id',
  name: '工作详情',
  // meta: {
  //   requireAuth: true
  // },
  component: require('./views/task-detail')
}, {
  path: '/two-code/:id',
  name: '任务详情已领取',
  meta: {
    requireAuth: true
  },
  component: require('./views/two-code')
}, {
  path: '/coupon',
  name: '优惠码',
  component: require('./views/coupon')
}, {
  path: '/paid-plans',
  name: '付费套餐',
  component: require('./views/paid-plans')
}, {
  path: '/my-center-cash-success',
  name: '提现成功',
  component: require('./views/my-center-cash-success')
}, {
  path: '/pull-up',
  name: '上拉',
  component: require('./views/pull-up')
}, {
  path: '/refreshAndInfinite',
  name: 'refreshAndInfinite',
  component: require('./views/refreshAndInfinite')
}, {
  path: '/job-index',
  name: '求职端首页',
  component: require('./views/job-index')
}, {
  path: '/job-talent-pool',
  name: '我的人才库job-person-center.vue',
  component: require('./views/job-talent-pool')
}, {
  path: '/job-person-center',
  name: '求职端个人中心job-skill-tags',
  component: require('./views/job-person-center')
}, {
  path: '/job-skill-tags',
  name: '求职端技能标签',
  component: require('./views/job-skill-tags')
}, {
  path: '/job-resume',
  name: '完善简历',
  component: require('./views/job-resume')
}, {
  path: '/job-work-exp/:work_id',
  name: '完善工作经历',
  component: require('./views/job-work-exp')
}, {
  path: '/job-edu-exp/:education_id',
  name: '完善教育经历',
  component: require('./views/job-edu-exp')
}, {
  path: '/job-hope-work/:job_id',
  name: '完善期望工作',
  component: require('./views/job-hope-work')
}, {
  path: '/job-project-exp/:project_id',
  name: '完善项目经历',
  component: require('./views/job-project-exp')
}, {
  path: '/job-self-intro/:self_intro_id',
  name: '完善个人介绍',
  component: require('./views/job-self-intro')
}, {
  path: '/job-become-headhunters',
  name: '成为猎头',
  component: require('./views/job-become-headhunters')
}, {
  path: '/job-work-aim',
  name: '工作意向设置',
  component: require('./views/job-work-aim')
}];
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.SET_TOKEN, window.localStorage.getItem('token'));
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.auth.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
