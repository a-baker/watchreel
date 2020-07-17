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

export const search = (type, searchTerm = '', options = {}) => {
    return get(`/search/${encodeURIComponent(type)}?query=${encodeURIComponent(searchTerm)}`, options);
}

export const getGenres = () => get('/genre/movie/list');

export const getPopular = (type, options = {}) => get(`/${encodeURIComponent(type)}/popular`, options);

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

const sizes = {
    backdrop: ['w300', 'w780', 'w1280' ],
    logo: ['w45', 'w185', 'w500'],
    poster: ['w92', 'w185', 'w780'],
    profile: ['w45', 'w185', 'h632'],
    still: ['w92', 'w185', 'w300'],
};

const sizePointer = {
    's': 0,
    'm': 1,
    'l': 2,
};

export const imageUrl = (type, size = 'original', path) => {
    let sizeName = size;
    if (size !== 'original') sizeName = sizes[type][sizePointer[size]];
    return `${BASE_IMAGE_URL}/${sizeName}${path}`;
};