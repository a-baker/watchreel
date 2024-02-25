<script setup lang="ts">
    const moviesStore = useMoviesStore();
</script>

<template>
    <div class="home">
        <CardList :movies="moviesStore.getPopularMovies" title="Popular Movies"/>
    </div>
</template>
  