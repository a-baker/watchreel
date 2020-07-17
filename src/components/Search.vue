<template>
  <div class="search">
    <input type="search" class="search__field" v-model="searchTerm" @input="updateList">
    <ul v-if="results.length" class="search__list">
      <li v-for="result in results" :key="result.id" class="search__item">
        {{ result.title }}
      </li>
    </ul>
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
.search {
  position: relative;
  display: inline-block;
  width: 30rem;
}

.search__field {
  width: 100%;
  padding: 1rem;
  border-radius: 3px;
  border: 2px solid #dadada;
}

.search__list {
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
}

.search__item {
  padding: 1rem;
  background-color: #00084c;
  color: #fff;
  border: 1px solid #040e6e;
}

.search__item:hover {
  background-color: #040e6e;
  cursor: pointer;
}
</style>
