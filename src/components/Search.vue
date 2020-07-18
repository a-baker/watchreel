<template>
  <div class="search">
    <input
      type="search"
      class="search__field"
      placeholder="Search movies..."
      v-model="searchTerm"
      @input="open = true"
      @focus="open = true"
    />
    <ul v-if="results.length && open" class="search__list">
      <li v-for="result in results" :key="result.id" class="search__item">
        <img class="search__poster" :src="imageUrl('poster', 's', result.poster_path)" :alt="'Poster for movie ' + result.title">
        <p><router-link class="transparent-link block-link search__link" :to="'/movie/' + result.id" @click.native="open = false">{{ result.title }} <span class="year">({{ result.release_date.split('-')[0] }})</span></router-link></p>
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
      open: false,
    };
  },

  watch: {
    searchTerm() {
      this.updateList();
    }
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
  max-width: 50rem;
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

.search__field::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23eaeaea' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'%3E%3C/path%3E%3C/svg%3E") center / contain;
}

.search__list {
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  right: 0;
  width: calc(100vw - 3rem);
  text-align: left;
  background-color: var(--color-dark-grey);
  padding: 1rem;
  z-index: 3;
  box-shadow: 0px 5px 10px -2px #000;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  border-radius: 5px;
}

.search:not(:focus-within) .search__list {
  display: none;
}

.search__item {
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
}

.search__item:hover, .search__item:focus-within {
  background-color: var(--color-brand);
  color: var(--color-black);
  cursor: pointer;
}

.search__link {
  outline: none;
}

.search__poster {
  width: 4rem;
  height: 6rem;
  overflow: hidden;
  margin-right: 1rem;
}

@media all and (min-width: 48em) {
  .search__list {
    width: 100%;
  }
}
</style>
