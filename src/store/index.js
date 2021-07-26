import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'
Vue.use(Vuex)

const USER = 'user'
export default new Vuex.Store({
  state: {
    user: getItem(USER)
    // JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(USER, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
