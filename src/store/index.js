import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    user: {
      email: "",
      role: "",
    },
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),

  actions: {
    login: ({ commit }, { user }) => commit("SET_LOGIN", user),
    reset: ({ commit }) => commit("RESET", ""),
  },

  mutations: {
    SET_LOGIN: (state, user) => {
      state.user = user;
    },

    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },

  getters: {
    getUser: (state) => state.user,
  },
});
