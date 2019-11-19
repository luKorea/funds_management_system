import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
};

const state = { // 需要维护的状态
  isAuthenticated: false,  // 是否认证
  user: {}   // 存储用户信息
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
};

const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated)
      state.isAutHenticated = isAuthenticated;
    else
      state.isAuthenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user;
    else
      state.user = {}
  }
};

const actions = {
  // 授权
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  // 登录
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  // 退出
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null)
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
