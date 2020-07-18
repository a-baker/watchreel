<template>
  <div class="movie">
    <Card v-if="movie.id" :movie="movie" :header="true" />
  </div>
</template>

<script>
import { getMovie } from '@/components/TMDB';
import Card from '@/components/Card';

export default {
  name: 'Movie',
  props: ['id'],

  components: {
    Card,
  },

  data() {
    return {
      movie: {},
    };
  },

  methods: {
    setMovie() {
      getMovie(this.id)
        .then(response => {
          this.movie = response;
        });
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