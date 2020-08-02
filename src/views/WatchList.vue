<template>
  <div class="watch-list">
    <CardList v-if="movies && movies.length" :movies="movies" title="My Watch List" headingLevel="h1" />
  </div>
</template>

<script>
import CardList from '@/components/CardList';

export default {
  name: 'WatchList',

  components: {
    CardList,
  },

  computed: {
    movies() {
      return this.$store.getters.getWatchList;
    },
  },

  created() {
    this.$store.state.watchList.forEach(id => this.$store.dispatch('getMovieDetails', { id }));
  }
}
</script>