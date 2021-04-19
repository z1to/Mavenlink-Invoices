import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});

export default createStore({
  state: {
    authorized: false,
    serviceToken: "",
    successfulRegistration: false,
  },
  mutations: {
    setAuthorization(state, newState) {
      state.authorized = newState;
    },
    setServiceToken(state, newState) {
      state.serviceToken = newState;
    },
    setSuccessfulRegistration(state, newState) {
      state.successfulRegistration = newState;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocalStorage.plugin],
});
