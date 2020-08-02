<template>
    <section class="card-list">
        <component :is="headingLevel" class="card-list__title">{{ title }}</component>
        <Card v-for="movie in movies" :movie="movie" :key="movie.id" />
    </section>
</template>
<script>
import Card from './Card';

export default {
    name: 'CardList',

    components: {
        Card
    },

    props: {
        headingLevel: {
            type: String,
            default: 'h2',
        },
        movies: Array,
        title: String,
    },
}
</script>

<style scoped>
    .card-list {
        padding: 3rem 0;
        display: grid;
        gap: 1rem;
    }

    .card-list__title {
        grid-column: 1 / -1;
        font-size: 3rem;
        margin: 1rem 0;
    }

    @media all and (min-width: 48em) and (max-width: 59.9375em) {
        .card-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media all and (min-width: 60em) {
        .card-list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>