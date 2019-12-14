<template>
  <div class="search_page">
    <header>
      <router-link to="/" class="butt butt_ticket">Home</router-link>
    </header>
    <div class="movies" v-if='data.length'>
      <template v-for="movie in data">
        <movieComponent v-bind:key="movie.id" v-bind:data="movie"></movieComponent>
      </template>
    </div>
    <div class="movies" v-else=''>
      Not Found
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import movieComponent from '../movie_card.vue';

export default {
  name: 'app',
  components: { movieComponent },
  props: ['data'],
  data () {
    return {
      
    }
  },
  
}
</script>

<style lang="scss">
  .search_page{
    & .header{
      padding-bottom: 15px;
    }
  }
</style>
