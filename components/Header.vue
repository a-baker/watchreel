<script setup lang="ts">
    const moviesStore = useMoviesStore();
    const scrollTop = ref(0);
    const sticky = ref(false);

    const handleScroll = () => {
        let newScrollTop = document.scrollingElement.scrollTop;
        sticky.value = newScrollTop < scrollTop.value && newScrollTop > 0;
        scrollTop.value = newScrollTop;
    };

    onMounted(() => {
        scrollTop.value = document.scrollingElement.scrollTop;
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<template>
    <header :class="{ 'header': true, 'header--sticky': sticky }">
        <div class="container">
            <nav class="header__nav">
                <NuxtLink class="transparent-link name" to="/">watchreel</NuxtLink>
                <div class="header__nav__sub">
                    <NuxtLink class="transparent-link" to="/reel">
                        My Reel
                        <ClientOnly>
                            <span class="watchlist-count" v-if="moviesStore.reel.length < 99">{{ moviesStore.reel.length }}</span>
                            <span class="watchlist-emoji" v-else>😎</span>
                        </ClientOnly>
                    </NuxtLink>
                </div>
            </nav>
            <Search />
        </div>
    </header>
</template>

<style scoped>
    .header {
        padding: 2.5rem 0;
        backface-visibility: hidden;
    }

    .header--sticky {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: rgba(9, 10, 11 , 0.8);
        animation: dropIn 0.25s ease-out;
    }

    @keyframes dropIn {
        from {
            transform: translateY(-100%);
            opacity: 0.5;
        }
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