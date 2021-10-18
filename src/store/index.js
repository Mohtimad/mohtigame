import { createStore } from 'vuex'

export default createStore({
  state: {
    chat: '',
    rulesVisible: false,
    username: localStorage.getItem("username")
      ? JSON.parse(localStorage.getItem("username")).username
      : "error"
  },
  mutations: {
    incrementChat(state, text) {
      state.chat = text + "\n" + state.chat;
    }
  },
  actions: {
  },
  modules: {
  }
})
