import * as types from '../mutation-types';
// initial state
const state = {
  task_id: ''
};
// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  [types.SET_TASK_ID](state, data) {
    state.task_id = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
