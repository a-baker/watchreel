<template>
    <section>
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
    section {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    h2 {
        grid-column: 1 / -1;
        font-size: 3rem;
        margin: 1rem 0;
    }
</style>