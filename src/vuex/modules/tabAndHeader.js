import * as types from '../mutation-types';

// initial state
const state = {
  notShowTab: true
};

// getters
const getters = {
  notNeedTab: state => state.notShowTab
};

// actions
const actions = {
  tabSwitcher({
    commit,
    state
  }, status) {
    commit(types.SET_TAB_STATUS, status);
  }
};

// mutations
const mutations = {
  [types.SET_TAB_STATUS](state, status) {
    state.notShowTab = !!status;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
