import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { fs } from "../config/fbconfig";

export default new Vuex.Store({
  state: {
    movies: [],
    tv: [],
    netflixOriginal: [],
    favourites: [],
    profiles: [],
    profileId: false,
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
    },
    fetchFavourites: async state => {
      let favourites = [];
      let snapshot = await fs
        .collection("users")
        .doc(state.isAuth)
        .collection("profiles")
        .doc(state.profileId)
        .collection("favourites")
        .get();
      snapshot.forEach(doc => {
        favourites.push(doc.data());
      });
      if (favourites.length > 0) state.favourites = favourites;
      else state.favourites = [];
    },
    setProfileId: (state, payload) => {
      state.profileId = payload;
    },
    removeFavourite: (state, payload) => {
      state.favourites = state.favourites.filter(
        element => element.id !== payload
      );
    },
    addFavourite: (state, payload) => {
      state.favourites.push(payload);
    }
  },
  actions: {
    addAuth: ({ commit }, payload) => {
      commit("addAuth", payload);
    },
    addProfiles: ({ commit }, payload) => {
      commit("addProfiles", payload);
    },
    fetchLists: ({ commit }) => {
      commit("fetchLists");
    },
    fetchFavourites: ({ commit }) => {
      commit("fetchFavourites");
    },
    setProfileId: ({ commit }, payload) => {
      commit("setProfileId", payload);
    },
    removeFavourite: ({ commit }, payload) => {
      commit("removeFavourite", payload);
    },
    addFavourite: ({ commit }, payload) => {
      commit("addFavourite", payload);
    }
  },
  modules: {}
});
