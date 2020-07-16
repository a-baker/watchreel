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
      search('movie', this.searchTerm)
        .then(response => { 
          this.results = response.results;
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  padding: 10px;
  border-radius: 3px;
  border: 2px solid #dadada;
}
</style>
