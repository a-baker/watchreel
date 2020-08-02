<template>
    <header class="header">
      <div class="container">
        <nav class="header__nav">
          <router-link class="transparent-link name" to="/">watchreel</router-link>
          <div class="header__nav__sub">
                <router-link class="transparent-link" to="/watchlist">
                    Watch List
                    <span class="watchlist-count" v-if="$store.state.watchList.length < 99">{{ $store.state.watchList.length }}</span>
                    <span class="watchlist-emoji" v-else>😎</span>
                </router-link>
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

    .watchlist-count {
        width: 2rem;
        height: 2rem;
        font-size: 1.4rem;
        margin-left: 0.2rem;
        display: inline-block;
        vertical-align: 0.2rem;
        text-align: center;
        border-radius: 50%;
        background-color: var(--color-brand);
        color: var(--color-black);
    }

    .watchlist-emoji {
        font-size: 2.2rem;
        vertical-align: -0.3rem;
        margin-top: 0.3rem;
        display: inline-block;
    }

    @media all and (min-width: 37.5em) {
        .header__nav {
            margin: 0 1.5rem 0 0;
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