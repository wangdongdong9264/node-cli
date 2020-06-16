import Vue from 'vue'
import Vuex from 'vuex'

import Home from './modules/home'
import Login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home,
    Login
  }
})
