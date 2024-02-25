// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            apiBase: 'https://api.themoviedb.org/3',
            apiToken: '',
            gaId: 'UA-173272074-1',
        }
    },
    routeRules: {
        '/reel': { ssr: false },
    },
    modules: [
        '@pinia/nuxt',
    ],
})