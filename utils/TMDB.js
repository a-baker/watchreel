const get = async (path = '', options = {}) => {
    const runTimeConfig = useRuntimeConfig();
    const API_BASE = runTimeConfig.public.apiBase;
    const defaultOptions = {
        headers: {
            Authorization: `Bearer ${runTimeConfig.public.apiToken}`,
        },
    };

    const settings = { ...defaultOptions, ...options };
    const response = await $fetch(API_BASE + path, settings);
    return response;
};

export const search = (type, searchTerm = '', options = {}) => {
    return get(`/search/${encodeURIComponent(type)}?query=${encodeURIComponent(searchTerm)}`, options);
}

export const getGenres = () => get('/genre/movie/list');

export const getMovie = (id, append = []) => get(`/movie/${id}?append_to_response=${append.join(',')}`);

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
    if (!path) {
        // grey pixel
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2O4devWfwAIrgOO0ZEgnQAAAABJRU5ErkJggg==';
    }
    let sizeName = size;
    if (size !== 'original') sizeName = sizes[type][sizePointer[size]];
    return `${BASE_IMAGE_URL}/${sizeName}${path}`;
};