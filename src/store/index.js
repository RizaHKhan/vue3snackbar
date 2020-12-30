import { createStore } from "vuex";

export default createStore({
  state: {
    snackbarText: ["message 1"]
  },
  mutations: {
    ADD_SNACKBAR_MESSAGE(state, message) {
      state.snackbarText.push(message);
    },
    DELETE_SNACKBAR_MESSAGE(state) {
      state.snackbarText.shift();
    }
  },
  actions: {},
  getters: {
    GET_SNACKBAR_MESSAGES: state => state.snackbarText
  },
  modules: {}
});
