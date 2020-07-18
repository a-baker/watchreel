import Vue from 'vue';
import Vuex from 'vuex';
import types from './mutation-types';

import { getGenres } from '@/components/TMDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    genres: [],
    movies: [],
  },
  getters: {
    getGenre: state => id => {
      return state.genres.filter(genre => genre.id === id)[0];
    },
  },
  mutations: {
    [types.SET_GENRES](state, payload) {
      state.genres = payload;
    }
  },
  actions: {
    getGenres({ commit }) {
      getGenres()
        .then(response => {
          commit(types.SET_GENRES, response.genres);
        });
    },
  },
  modules: {
  },
});
