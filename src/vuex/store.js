/**
 * Created by czh
 * Description: 状态存储
 */
import Vue from 'vue';
import Vuex from 'vuex';
import api from './modules/api';
import tabAndHeader from './modules/tabAndHeader';
import auth from './modules/auth';
import params from './modules/params';
import task from './modules/task';
import createLogger from '../plugins/logger';
import actions from './actions';
import getters from './getters';
// 告诉 vue “使用” vuex
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    api,
    tabAndHeader,
    auth,
    params,
    task
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
