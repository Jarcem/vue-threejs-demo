import { createStore } from "vuex";

export default createStore({
  state: {
    LoadingKey: true,
  },
  mutations: {
    updateLoadingKey(state, data) {
      state.LoadingKey = data;
    },
  },
  actions: {},
  modules: {},
});
