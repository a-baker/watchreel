<template>
  <div id="app">
    <Search />
    <Popular />
  </div>
</template>

<script>
import Search from './components/Search';
import Popular from './components/Popular';

export default {
  name: 'App',
  components: {
    Search,
    Popular
  }
}
</script>

<style>
html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

#app {
  text-align: center;
  color: #333;
  margin-top: 6rem;
}
</style>
