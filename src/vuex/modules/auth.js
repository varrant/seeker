import * as types from '../mutation-types';
// initial state
const state = {
  resMsg: '请重新登录',
  token: ''
};
// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  [types.SET_TOKEN](state, data) {
    localStorage.token = data;
    state.token = data;
  },
  [types.LOGIN]: (state, data) => {
    localStorage.token = data;
    state.token = data;
  },
  [types.LOGOUT]: (state) => {
    localStorage.removeItem('token');
    state.token = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
