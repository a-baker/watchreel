<template>
  <div class="movie">
    <Card v-if="movie" :movie="movie" :header="true" />
    <button type="button" @click="toggleOnWatchList" :class="{ 'add-button': true, 'add-button--added': onWatchList }">
      <span class="visually-hidden">{{ onWatchList ? 'Remove from' : 'Add to' }} watch list</span>
    </button>
    <CardList v-if="movie && movie.similar && movie.similar.length" :movies="movie.similar" :title="'Similar to ' + movie.title" />
  </div>
</template>

<script>
import types from '@/store/mutation-types';
import Card from '@/components/Card';
import CardList from '@/components/CardList';

export default {
  name: 'Movie',
  props: ['id'],

  components: {
    Card,
    CardList,
  },

  computed: {
    movie() {
      return this.$store.getters.getActiveMovie;
    },

    onWatchList() {
      return this.movie && this.$store.state.watchList.includes(this.movie.id);
    },
  },

  methods: {
    setMovie() {
      const { id } = this;
      this.$store.dispatch('getMovieDetails', { id });
      this.$store.commit(types.SET_ACTIVE_MOVIE, { id });
    },

    toggleOnWatchList() {
      this.$store.dispatch('toggleOnWatchList', { id: this.movie.id });
    }
  },

  created() {
    this.setMovie();
  },

  watch: {
    id() {
      this.setMovie();
    },
  },
}
</script>

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
    background: url('../assets/images/icons/plus.svg') no-repeat center / 3rem auto;
  }

  .add-button--added::after {
    animation: addToList 0.25s ease-in-out forwards;
  }

  @keyframes addToList {
    49.9% {
      transform: scaleY(0);
      background-image: url('../assets/images/icons/plus.svg');
    }

    50%, 100% {
      background-image: url('../assets/images/icons/eye.svg');
    }

    100% {
      transform: scaleY(1);
    }
  }
</style>