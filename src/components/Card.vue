<template>
    <article>
        <h3>{{ movie.title }} ({{ movie.release_date.split('-')[0] }})</h3>
        <p>{{ movie.overview }}</p>
    </article>
</template>

<script>
export default {
    name: 'Card',
    props: ['movie'],
}
</script>

<style scoped>
    article {
        border-radius: 5px;
        border: 1px solid #dadada;
        box-shadow: 0px 5px 3px -1px #dadada;
        padding: 1rem;
    }
</style>