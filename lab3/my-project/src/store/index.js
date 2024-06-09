import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    sessions: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSessions(state, sessions) {
      state.sessions = sessions;
    }
  },
  actions: {
    async register({ commit }, user) {
      try {
        const response = await axios.post('/api/register', user);
        commit('setUser', response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        commit('setUser', response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async fetchSessions({ commit }) {
      try {
        const response = await axios.get('/api/sessions');
        commit('setSessions', response.data);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
});
