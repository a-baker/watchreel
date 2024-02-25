<script setup lang="ts">
    const moviesStore = useMoviesStore();
    const movies = moviesStore.getReel;

    await Promise.all(movies.map(({ id }) => moviesStore.fetchMovieDetails(id)));
</script>

<template>
    <div class="watch-list">
        <CardList :movies="movies" title="My Reel" headingLevel="h1" />
        <p class="empty-list" v-if="!(movies && movies.length)">
            There are no movies on your reel. You can keep track of the movies you want to watch by using the + button at the top of any movie page.
        </p>
    </div>
</template>

<style scoped>
    .empty-list {
        font-size: 1.8rem;
        padding: 1.5rem;
        background-color: var(--color-dark-grey);
        border-radius: 3px;
    }
</style>