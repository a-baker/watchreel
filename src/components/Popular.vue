<template>
    <section>
        <h2>Popular Movies</h2>
        <Card v-for="movie in movies" :movie="movie" :key="movie.id"/>
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

    mounted() {
        this.updateData();
    },
}
</script>

<style scoped>
    section {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid #dfdfdf;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    h2 {
        grid-column: 1 / -1;
    }
</style>