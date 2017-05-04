import * as types from '../mutation-types';

// initial state
const state = {
  he_id: ''
};

// getters
const getters = {
};

// actions
const actions = {
};

// mutations
const mutations = {
  [types.SET_HE_ID](state, data) {
    state.he_id = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
