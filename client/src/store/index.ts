import { createStore } from "vuex";

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
});
