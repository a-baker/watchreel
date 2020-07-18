<template>
  <div class="movie">
    <Card v-if="movie" :movie="movie" :header="true" />
    <CardList v-if="movie && movie.similar" :movies="movie.similar" :title="'Similar to ' + movie.title" />
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
    }
  },

  methods: {
    setMovie() {
      const { id } = this;
      this.$store.dispatch('getMovieDetails', { id });
      this.$store.commit(types.SET_ACTIVE_MOVIE, { id });
    },
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