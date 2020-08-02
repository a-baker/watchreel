<template>
  <div class="watch-list">
    <CardList :movies="movies" title="Watch List" headingLevel="h1" />
    <p class="empty-list" v-if="!(movies && movies.length)">
      There are no movies on your list. You can keep track of the movies you want to watch by using the + button at the top of any movie page.
    </p>
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

<style scoped>
  .empty-list {
    font-size: 1.8rem;
    padding: 1.5rem;
    background-color: var(--color-dark-grey);
    border-radius: 3px;
  }
</style>