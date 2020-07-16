const API_BASE = 'https://api.themoviedb.org/3';

const defaultOptions = {
    headers: {
        Authorization: `Bearer ${process.env.VUE_APP_TMDB_API_TOKEN}`,
    },
};

const get = async (path = '', options = {}) => {
    const settings = Object.assign({}, defaultOptions, options);
    const response = await fetch(API_BASE + path, settings);
    return response.json();
};

export const search = (type, searchTerm) => {
    return get(`/search/${encodeURIComponent(type)}?query=${encodeURIComponent(searchTerm)}`);
}