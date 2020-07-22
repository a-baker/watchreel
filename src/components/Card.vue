<template>
    <article :class="{ card: true, 'card--link': !header, 'card--header': !!header }">
        <img class="card__image" :src="imageUrl('backdrop', header ? 'l' : 'm', movie.backdrop_path)" :alt="'Backdrop image for movie ' + movie.title">
        <div class="card__content">
            <component :is="header ? 'h1' : 'h3'" class="card__title">
                <router-link class="block-link transparent-link" :to="'/movie/' + movie.id" v-if="!header">
                    {{ movie.title }} <span v-if="movie.release_date" class="year">({{ movie.release_date.split('-')[0] }})</span>
                </router-link>
                <template v-else>
                    {{ movie.title }} <span v-if="movie.release_date" class="year">({{ movie.release_date.split('-')[0] }})</span>
                </template>
                <span v-if="movie.popular && header" class="card__popular">🔥</span>
                <span v-if="header" class="stars" :style="`--rating: ${stars};`" :aria-label="`Rating of this movie is ${stars} out of 5.`"></span>
            </component>
            <p class="card__copy">{{ movie.overview }}</p>
            <ul class="tags">
                <li v-for="genre in genres" :key="genre.id" class="tag">{{ genre.name }}</li>
            </ul>
        </div>
    </article>
</template>

<script>
import { imageUrl } from '@/components/TMDB';

export default {
    name: 'Card',

    props: ['movie', 'header'],

    computed: {
        genres() {
            if (this.movie.genres)
                return this.movie.genres;

            return this.movie.genre_ids.map(id => this.$store.getters.getGenre(id));
        },

        stars() {
            return this.movie.vote_average / 2;
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
        overflow: hidden;
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

    .card__popular {
        font-size: 0.7em;
        vertical-align: 0.1em;
        margin-left: 0.3rem;
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

    /* Header card */
    .card.card--header {
        padding-top: 20rem;
    }

    .card--header .card__image {
        opacity: 0.9;
    }

    .card--header .card__content::before {
        content: '';
        display: block;
        position: absolute;
        left: -2rem;
        right: -2rem;
        bottom: -2rem;
        top: -20rem;
        background: linear-gradient(transparent, rgba(28, 31, 34, 0.7) 18rem);
        z-index: -1;
    }

    .card--header .card__content {
        position: relative;
    }

    .stars {
        --star-color: var(--color-brand);
        --percent: calc(var(--rating) / 5 * 100%);

        display: inline-block;
        vertical-align: middle;
        margin-left: 0.8rem;
        font-size: 0.64em;
        font-family: Times;
        line-height: 1;
    }

    .stars::before {
        content: '★★★★★';
        letter-spacing: 0.3rem;
        background: linear-gradient(to right, var(--star-color) var(--percent), transparent var(--percent));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 1px var(--star-color);
    }
</style>