<script setup lang="ts">
    const moviesStore = useMoviesStore();

    const route = useRoute();
    const id = route.params.id;

    await useAsyncData('movie', () => moviesStore.fetchMovieDetails(id))
    moviesStore.setActiveMovie(id);

    const movie = moviesStore.getActiveMovie;

    const onReel = computed(() => {
        return movie && moviesStore.reel.includes(movie.id);
    });

    const toggleOnReel = () => {
        moviesStore.toggleOnReel(movie.id);
    }

    useSeoMeta({
        title: computed(() => {
            let title = movie.title;
            if (movie.release_date) title += ` (${movie.release_date.split('-')[0]})`;
            return title;
        }),
    });
</script>

<template>
    <div class="movie">
        <Card v-if="movie" :movie="movie" :header="true" />
        <button type="button" @click="toggleOnReel" :class="{ 'add-button': true, 'add-button--added': onReel }">
            <span class="visually-hidden">{{ onReel ? 'Remove from' : 'Add to' }} watch list</span>
        </button>
        <CastList v-if="movie?.credits?.cast?.length" :cast="movie.credits.cast" />
        <CardList v-if="movie?.similar?.length" :movies="movie.similar" :title="'Similar to ' + movie.title" />
    </div>
</template>

<style scoped>
    .movie {
        margin-top: 3rem;
        position: relative;
    }

    .add-button {
        width: 5rem;
        height: 5rem;
        padding: 0;
        border: none;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
    }

    .add-button:hover, .add-button:focus {
        outline: none;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .add-button::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('~/assets/images/icons/plus.svg') no-repeat center / 3rem auto;
    }

    .add-button--added::after {
        animation: addToList 0.25s ease-in-out forwards;
    }

    @keyframes addToList {
        49.9% {
            transform: scaleY(0);
            background-image: url('~/assets/images/icons/plus.svg');
        }
        
        50%, 100% {
            background-image: url('~/assets/images/icons/eye.svg');
        }
        
        100% {
            transform: scaleY(1);
        }
    }
</style>