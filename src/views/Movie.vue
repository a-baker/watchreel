<template>
  <div class="movie">
    <Card v-if="movie" :movie="movie" :header="true" />
  </div>
</template>

<script>
import types from '@/store/mutation-types';
import Card from '@/components/Card';

export default {
  name: 'Movie',
  props: ['id'],

  components: {
    Card,
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

  .card {
    padding-top: 20rem;
  }
</style>