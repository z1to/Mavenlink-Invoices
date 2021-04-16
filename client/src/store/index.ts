import { createStore } from "vuex";
import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

export default createStore({
  state: {
    authorized: false,
    serviceToken: "",
  },
  mutations: {
    setAuthorization(state, newState) {
      state.authorized = newState;
    },
    setServiceToken(state, newState) {
      state.serviceToken = newState;
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocalStorage.plugin],
});
