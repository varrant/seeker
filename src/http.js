/**
 * http配置
 */

import axios from 'axios';
import store from './vuex/store';
import * as types from './vuex/mutation-types';
import router from './router';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://api.91suzhi.com';
// axios.headers.token = '5IgLzWzEVT5nHjMs5WCdNWE2CbCYWkzkyoqQPd_ZAaCiqBTP_q6TpBYsTqHBZy06T2BPl1fybmJstVG3xyGYlA';
axios.defaults.headers.common['Authorization'] = store.state.auth.token;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.auth.token) {
      config.headers.Authorization = `${store.state.auth.token}`;
    }
    return config;
  },
  err => {
    return axios.Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return axios.Promise.reject(error.response.data);
  });

export default axios;
