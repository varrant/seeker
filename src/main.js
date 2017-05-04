import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch);
// 同步路由
import {
  sync
} from 'vuex-router-sync';
import VueRouter from 'vue-router';
import './styles/sass/reset.scss';
import './styles/fonts/font-awesome/font-awesome.css';
import './styles/fonts/font-customize/iconfont.css';
import App from './app';
import router from './router.js';
import vueTap from 'v-tap';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VIscroll from 'viscroll';
Vue.use(VIscroll, {
  mouseWheel: true,
  click: false,
  preventDefault: true,
  tap: false,
  bounce: false,
  disableTouch: true
});

Vue.use(Mint);
// import fastclick from 'fastclick';
import Vuex from 'vuex';
import axios from './http';
// 全局store
// import store from './store/store';
import store from './vuex/store';

Vue.prototype.axios = axios;
// import vueResource from 'vue-resource';
// Vue.use(vueResource);
Vue.use(vueTap);
// 使用全局数据流
Vue.use(Vuex);
// footer
import publicFooter from './components/footer';
// 使用路由
Vue.use(VueRouter);
// 同步路由
sync(store, router);
Vue.component('publicFooter', publicFooter);

new Vue({
  // el: '#app',
  axios,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
