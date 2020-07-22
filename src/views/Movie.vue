<template>
  <div class="movie">
    <Card v-if="movie" :movie="movie" :header="true" />
    <button type="button" @click="toggleOnWatchList">
      {{ onWatchList ? 'Remove from' : 'Add to' }} watch list
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
  }
</style>