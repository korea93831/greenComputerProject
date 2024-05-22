import { createStore } from 'vuex'

export default createStore({
  state: {
    token:null
  },
  getters: {
    isLogin(state){
      return state.token==null ? false:true;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
