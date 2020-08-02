<template>
    <header class="header">
      <div class="container">
        <nav class="header__nav">
          <router-link class="transparent-link name" to="/">watchreel</router-link>
          <div class="header__nav__sub">
              <router-link class="transparent-link" to="/watchlist">Watch List</router-link>
          </div>
        </nav>
        <Search />
      </div>
    </header>
</template>

<script>
import Search from '@/components/Search';

export default {
    name: 'Header',
    components: {
        Search,
    }
}
</script>

<style scoped>
    .header {
        padding: 2.5rem 0;
    }

    .container {
        flex-wrap: wrap;
    }

    .header__nav,
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header__nav,
    .search {
        width: 100%;
    }

    .header__nav {
        margin-bottom: 1.5rem;
    }

    .header__nav__sub {
        font-size: 1.8rem;
        font-weight: 600;
    }

    .name {
        margin-right: 1.5rem;
        font-size: 2.6rem;
        font-weight: 600;
        color: var(--color-brand);
    }

    .name:visited {
        color: var(--color-brand);
    }

    @media all and (min-width: 37.5em) {
        .header__nav {
            margin: 0 1.5rem 0;
            width: auto;
            flex-grow: 1;
        }

        .search {
            width: auto;
            flex-grow: 1;
            max-width: 50rem;
        }
    }
</style>