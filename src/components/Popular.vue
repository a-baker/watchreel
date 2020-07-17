<template>
    <section class="popular">
        <h2>Popular Movies</h2>
        <Card v-for="movie in movies" :movie="movie" :key="movie.id" :genres="genres"/>
    </section>
</template>
<script>
import { getPopular } from './TMDB';
import Card from './Card';

export default {
    name: 'Popular',

    components: {
        Card
    },

    props: ['genres'],

    data() {
        return {
            movies: [],
        };
    },

    methods: {
        updateData() {
            getPopular('movie')
                .then(response => { this.movies = response.results })
        },
    },

    created() {
        this.updateData();
    },
}
</script>

<style scoped>
    .popular {
        padding: 3rem 0;
        display: grid;
        gap: 1rem;
    }

    h2 {
        grid-column: 1 / -1;
        font-size: 3rem;
        margin: 1rem 0;
    }

    @media all and (min-width: 48em) and (max-width: 59.9375em) {
        .popular {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media all and (min-width: 60em) {
        .popular {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>