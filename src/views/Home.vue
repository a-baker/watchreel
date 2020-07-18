<template>
  <div class="home">
    <CardList :movies="$store.getters.getPopularMovies" :title="'Popular Movies'"/>
  </div>
</template>

<script>
import CardList from '@/components/CardList';

export default {
  name: 'Home',
  components: {
    CardList,
  },
};
</script>
