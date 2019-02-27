import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },

  mutations: {
    getUsername: (state, username) => {
      state.username = username
      // 将username 保存到 本地存储上去 
      localStorage.setItem('username',username);
    }
  },
  actions: {

  },
  getters: {
    username: () => {
      return localStorage.getItem('username');
    }
  }
})