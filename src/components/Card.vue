<template>
    <article :class="{ card: true, 'card--link': !header }">
        <img class="card__image" :src="imageUrl('backdrop', 'm', movie.backdrop_path)" :alt="'Backdrop image for movie ' + movie.title">
        <div class="card__content">
            <component :is="header ? 'h1' : 'h3'" class="card__title">
                <router-link class="block-link transparent-link" :to="'/movie/' + movie.id" v-if="!header">
                    {{ movie.title }} <span class="year">({{ movie.release_date.split('-')[0] }})</span>
                </router-link>
                <template v-else>
                    {{ movie.title }} <span class="year">({{ movie.release_date.split('-')[0] }})</span>
                </template>
            </component>
            <p class="card__copy">{{ movie.overview }}</p>
            <ul class="tags">
                <li v-for="genre in genreList" :key="genre.id" class="tag">{{ genre.name }}</li>
            </ul>
        </div>
    </article>
</template>

<script>
import { imageUrl } from './TMDB';

export default {
    name: 'Card',

    props: ['movie', 'genres', 'header'],

    computed: {
        genreList() {
            if (this.movie.genres)
                return this.movie.genres;

            return this.movie.genre_ids.map(id => ({ id, name: this.genres[id] }));
        },
    },

    methods: {
        imageUrl,
    },
}
</script>

<style scoped>
    .card {
        position: relative;
        border-radius: 5px;
        border: 1px solid #000;
        box-shadow: 0px 5px 3px -1px #000;
        background-color: var(--color-dark-grey);
        padding: 2rem;
    }

    .card--link {
        transition: 0.2s ease-in-out;
        transition-property: box-shadow transform;

        --box-shadow-offset: 0;
        box-shadow: 0 0 0 var(--box-shadow-offset) var(--color-brand);
    }

    .card--link:hover {
        cursor: pointer;
    }

    .card--link:hover,
    .card--link:focus-within {
        --box-shadow-offset: 2px;
    }

    /* 
        gets the content to display over the image without setting position relative
        so the full block link can be relative to the whole card
     */
    .card__content {
        opacity: 0.9999;
    }

    .card__title {
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    .card__image {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        opacity: 0.1;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1.5rem;
    }

    .tag {
        background-color: var(--color-brand);
        color: var(--color-black);
        border-radius: 10rem;
        padding: 0.8rem;
        margin-right: 0.5rem;
        margin-bottom: 0.8rem;
        line-height: 0.7;
        font-size: 1.4rem;
    }
</style>