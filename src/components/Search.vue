<template>
  <div class="search">
    <input type="search" v-model="searchTerm" @input="updateList">
    <div v-for="result in results" :key="result.id">
      {{ result.title }}
    </div>
  </div>
</template>

<script>
import { search } from './TMDB.js';

let controller, signal;

export default {
  name: 'Search',
  data() {
    return {
      searchTerm: '',
      results: [],
    };
  },

  methods: {
    updateList() {
      if (controller) controller.abort();
      controller = new AbortController();
      signal = controller.signal;

      search('movie', this.searchTerm, { signal })
        .then(response => { 
          this.results = response.results;
        })
        .catch(err => {
          if (err.name !== 'AbortError') console.error(err);
        });
    },
  }
}
</script>

<style scoped>
input {
  padding: 10px;
  border-radius: 3px;
  border: 2px solid #dadada;
}
</style>
