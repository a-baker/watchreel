import Vue from 'vue';
import Vuex from 'vuex';
import types from './mutation-types';

import { getGenres, getMovie, getPopular } from '@/components/TMDB';

Vue.use(Vuex);

function getById(arr, id) {
  return arr.filter(item => item.id.toString() === id.toString())[0];
}

export default new Vuex.Store({
  state: {
    genres: [],
    movies: [],
    activeMovieId: '',
  },
  getters: {
    getGenre: ({ genres }) => id => {
      return getById(genres, id);
    },

    getMovie: ({ movies }) => id => {
      return getById(movies, id);
    },

    getActiveMovie({ movies, activeMovieId }) {
      return getById(movies, activeMovieId);
    },

    getPopularMovies({ movies }) {
      return movies.filter(movie => Boolean(movie.popular));
    },
  },
  mutations: {
    [types.SET_GENRES](state, { genres }) {
      state.genres = genres;
    },

    [types.SET_ACTIVE_MOVIE](state, { id }) {
      state.activeMovieId = id;
    },

    [types.UPDATE_MOVIE_DATA](state, { id, data }) {
      const movie = getById(state.movies, id);
      if (movie) {
        Object.assign(movie, data);
      }
      else {
        state.movies.push(data);
      }
    },
  },
  actions: {
    getGenres({ commit }) {
      getGenres()
        .then(response => {
          commit(types.SET_GENRES, { genres: response.genres });
        });
    },

    getMovieDetails({ commit, getters }, { id }) {
      const movie = getters.getMovie(id);
      if (movie && movie.detailsFetched) return;

      getMovie(id, ['similar'])
        .then(response => {
          const movie = response;
          const similar = response.similar && response.similar.results || [];

          movie.similar = similar;
          if (similar.length) {
            similar.forEach(similarMovie => {
              commit(
                types.UPDATE_MOVIE_DATA,
                {
                  id: similarMovie.id,
                  data: similarMovie,
                }
              );
            });
          }

          commit(
            types.UPDATE_MOVIE_DATA, 
            {
              id,
              data: Object.assign({}, response, { detailsFetched: true }),
            }
          );
        });
    },

    getPopularMovies({ commit }) {
      getPopular('movie')
        .then(response => {
          response.results.forEach(movie => {
            commit(
              types.UPDATE_MOVIE_DATA,
              {
                id: movie.id,
                data: Object.assign({}, movie, { popular: true }),
              }
            );
          });
        });
    },
  },
  modules: {
  },
});
