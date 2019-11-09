import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    tv: [],
    netflixOriginal: [],
    profiles: [],
    isAuth: localStorage.userId ? localStorage.userId : false
  },
  getters: {
    isAuth: state => {
      return state.isAuth;
    }
  },

  mutations: {
    addAuth: (state, payload) => {
      state.isAuth = payload;
    },
    addProfiles: (state, payload) => {
      state.profiles = payload;
    },
    fetchLists: async state => {
      await fetch(
        `https://api.themoviedb.org/3/discover/tv?with_networks=213&api_key=${process.env.VUE_APP_TMDB_API_KEY}`
      )
        .then(res => res.json())
        .then(data => (state.netflixOriginal = data.results));
      console.log(state.netflixOriginal);
      await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US`
      )
        .then(res => res.json())
        .then(data => (state.tv = data.results));
      console.log(state.tv);
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US`
      )
        .then(res => res.json())
        .then(data => (state.movie = data.results));
      console.log(state.movie);
    }
  },
  actions: {
    addAuth: ({ commit }, payload) => {
      commit('addAuth', payload);
    },
    addProfiles: ({ commit }, payload) => {
      commit('addProfiles', payload);
    },
    fetchLists: ({ commit }) => {
      commit('fetchLists');
    }
  },
  modules: {}
});
