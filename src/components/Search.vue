<template>
  <div class="search">
    <input type="search" class="search__field" placeholder="Search movies..." v-model="searchTerm" @input="updateList">
    <ul v-if="results.length" class="search__list">
      <li v-for="result in results" :key="result.id" class="search__item">
        <img class="search__poster" :src="imageUrl('poster', 's', result.poster_path)" :alt="'Poster for movie ' + result.title">
        <p><router-link class="transparent-link block-link" :to="'/movie/' + result.id">{{ result.title }} <span class="year">({{ result.release_date.split('-')[0] }})</span></router-link></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { search, imageUrl } from './TMDB.js';

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
    imageUrl,

    updateList() {
      if (controller) controller.abort();

      if (!this.searchTerm) {
        this.results = [];
        return;
      }

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
  display: block;
  max-width: 60rem;
  flex-grow: 1;
}

.search__field {
  width: 100%;
  padding: 1rem;
  border-radius: 3px;
  background-color: transparent;
  border: 2px solid var(--color-light-grey);
  color: var(--color-white);
}

.search__field:focus {
  outline: none;
  border-color: var(--color-brand);
}

.search__list {
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  left: 0;
  width: 100%;
  text-align: left;
  background-color: var(--color-dark-grey);
  padding: 1rem;
  z-index: 3;
  box-shadow: 0px 5px 10px -2px #000;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
}

.search__item {
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
}

.search__item:hover {
  background-color: var(--color-brand);
  color: var(--color-black);
  cursor: pointer;
}

.search__poster {
  width: 4rem;
  height: 6rem;
  overflow: hidden;
  margin-right: 1rem;
}
</style>
