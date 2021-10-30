<template>
    <section>
        <component :is="headingLevel" class="cast-list__title">Top billed cast</component>
        <ul>
            <li v-for="person in cast.slice(0, 10)" :key="person.cast_id">
                <img :src="imageUrl('profile', 'm', person.profile_path)" :alt="'Photo of ' + person.name">
                <span class="actor">{{ person.name }}</span>
                <span class="character">{{ person.character }}</span>
            </li>
        </ul>
    </section>
</template>

<script>
import { imageUrl } from '@/components/TMDB';
export default {
    name: 'CastList',
    props: {
        cast: {
            type: Array,
        },
        
        headingLevel: {
            type: String,
            default: 'h2',
        },
    },
    methods: {
        imageUrl,
    }
}
</script>

<style scoped>
    section {
        padding: 3rem 0 0;
    }

    .cast-list__title {
        font-size: 3rem;
        margin: 1rem 0;
    }

    ul {
        list-style: none;
        display: flex;
        gap: 0 1rem;
        overflow-x: auto;
        padding-bottom: 1rem;
    }

    ul::-webkit-scrollbar {
        height: 0.8rem;
    }

    ul::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 1rem;
    }

    ul:hover::-webkit-scrollbar-thumb {
        background-color: rgba(234, 234, 234, 60%);
    }

    li {
        margin: 0;
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
    }

    img {
        width: 10rem;
        height: 13rem;
        margin-bottom: 0.6rem;
        border-radius: 1rem;
        object-fit: cover;
        object-position: top;
        border: 2px solid var(--color-brand);
    }

    .actor {
        font-weight: bold;
    }

    .character {
        color: var(--color-light-grey);
    }
</style>