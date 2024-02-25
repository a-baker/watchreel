import { defineStore, skipHydrate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { getGenres as apiGetGenres, getMovie as apiGetMovie, getPopular as apiGetPopular } from '~/utils/TMDB';

type ID = string | number;

function getById(arr: {id: ID}[], id: ID) {
    return arr.filter(item => item.id.toString() === id.toString())[0];
}

export const useMoviesStore = defineStore('movies', () => {
    // State
    const genres = ref([]);
    const movies = ref([]);
    const reel = useLocalStorage('reel', []);
    const activeMovieId = ref('');

    // Getters
    const getGenre = computed(() => ((id: ID) => getById(genres.value, id)));
    const getMovie = computed(() => ((id: ID) => getById(movies.value, id)));
    const getActiveMovie = computed(() => getById(movies.value, activeMovieId.value));
    const getPopularMovies = computed(() => movies.value.filter((movie: {popular: Boolean}) => !!movie.popular));
    const getReel = computed(() => movies.value.filter((movie: {id: ID}) => reel.value.includes(movie.id)));

    // Actions
    const fetchGenres = async () => {
        const response = await apiGetGenres();
        genres.value = response.genres;
    };

    const setActiveMovie = (id: ID) => {
        activeMovieId.value = id;
    }

    const updateMovieData = (id: ID, data: object) => {
        const movie = getById(movies.value, id);
        if (movie) {
            Object.assign(movie, data);
        }
        else {
            movies.value.push(Object.assign({ id }, data));
        }
    };

    const fetchMovieDetails = async (id: ID) => {
        const movieInStore = getMovie.value(id);
        if (movieInStore?.detailsFetched) return;

        const response = await apiGetMovie(id, ['similar', 'credits']);
        const movie = response;
        const similar = response.similar?.results || [];
        movie.similar = similar;

        if (similar.length) {
            for (let similarMovie of similar) {
                updateMovieData(similarMovie.id, similarMovie);
            }
        }

        updateMovieData(id, { ...movie, detailsFetched: true })
    };

    const fetchPopularMovies = async () => {
        const response = await apiGetPopular('movie');
        for (let movie of response.results) {
            updateMovieData(movie.id, { ...movie, popular: true });
        }
    };

    const addToReel = (id: ID) => {
        reel.value.push(id);
    };
  
    const removeFromReel = (id: ID) => {
        reel.value.splice(reel.value.indexOf(id), 1);
    };

    const toggleOnReel = (id: ID) => {
        const addingToList = !(reel.value.includes(id));

        if (addingToList) {
            addToReel(id);
        }
        else {
            removeFromReel(id);
        }
    };

    return { 
        genres, movies, reel: skipHydrate(reel), activeMovieId,
        getGenre, getMovie, getActiveMovie, getPopularMovies, getReel,
        fetchGenres, updateMovieData, fetchMovieDetails, fetchPopularMovies, addToReel, removeFromReel, toggleOnReel, setActiveMovie,
    };
});