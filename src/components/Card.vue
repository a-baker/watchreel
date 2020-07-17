<template>
    <article class="card">
        <div class="card__content">
            <h3 class="card__title">{{ movie.title }} <span class="year">({{ movie.release_date.split('-')[0] }})</span></h3>
            <p class="card__copy">{{ movie.overview }}</p>
            <ul class="tags">
                <li v-for="id in movie.genre_ids" :key="id" class="tag">{{ genres[id] }}</li>
            </ul>
        </div>
        <img class="card__image" :src="imageUrl('backdrop', 'm', movie.backdrop_path)" :alt="'Backdrop image for movie ' + movie.title">
    </article>
</template>

<script>
import { imageUrl } from './TMDB';

export default {
    name: 'Card',
    props: ['movie', 'genres'],

    methods: {
        imageUrl
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

    .card__title {
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

    .card__image {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
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