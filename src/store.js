import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  state: {
    user: {},
    flips: [],
    subjects: []
  },
  mutations: {
    saveUser(state, payload) {
      state.user = payload
    },
    saveFlips(state, payload) {
      state.flips = payload
    },
    saveSubjects(state, payload) {
      state.subjects = payload
    }
  },
  getters: {
    getFlips(state) {
      return state.flips
    },
    getSubjects(state) {
      return state.subjects
    },
  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
});
