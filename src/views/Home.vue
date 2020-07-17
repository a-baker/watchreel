<template>
  <div class="home">
    <Popular :genres="genres"/>
  </div>
</template>

<script>
import Popular from '@/components/Popular';

export default {
  name: 'Home',
  props: ['genres'],
  components: {
    Popular,
  },
};
</script>
