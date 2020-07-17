<template>
    <header class="header">
      <div class="container">
        <nav class="header__nav">
          <router-link class="transparent-link name" to="/">watchreel</router-link>
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

    .name {
        font-size: 2.6rem;
        font-weight: 600;
        color: var(--color-brand);
    }

    .name:visited {
        color: var(--color-brand);
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>