<template>
  <div class="container">
    <Search />
    <Popular :genres="genres"/>
  </div>
</template>

<script>
import Search from './components/Search';
import Popular from './components/Popular';
import { getGenres } from './components/TMDB';

export default {
  name: 'App',
  components: {
    Search,
    Popular
  },

  data() {
    return {
      genres: {},
    }
  },

  mounted() {
    getGenres()
      .then(response => {
        this.genres = response.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
      });
  },
}
</script>

<style>
:root {
  --color-black: #090a0b;
  --color-dark-grey: #1c1f22;
  --color-light-grey: #d8d4d5;
  --color-white: #eaeaea;
  --color-brand: #fbd1a2;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 1.6rem;
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-black);
  color: var(--color-white);
}

*,
*::before,
*::after {
  box-sizing: inherit;
  font-family: inherit;
  font: inherit;
}

h1, h2, h3,
p {
  margin: 0;
}

h1, h2, h3 {
  font-weight: 600;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.container {
  margin: 0 auto;
  max-width: 125rem;
  padding: 0 1.5rem;
}

.year {
  font-size: 0.9em;
  opacity: 0.7;
}
</style>
