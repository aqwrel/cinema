<template>
  <div class="page">
    <header>
      <router-link to="/" class="butt butt_ticket">Home</router-link>
    </header>
    <ComponentSearch v-bind:data="movie"></ComponentSearch>
    <div class="movies">
        <movieComponent v-for="movie in movies" v-bind:key="movie.id" v-bind:data="movie"></movieComponent>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import movieComponent from '../movie_card.vue';
import ComponentSearch from '../filter.vue';
export default {
  name: 'app',
  components: { movieComponent, ComponentSearch },
  data () {
    return {
      movies: [],
      movie: null
    }
  },
  beforeCreate() {
    axios
      .get('https://cinema-api-test.herokuapp.com/movies')
      .then(response => (this.movies = response.data))
  },
}
</script>

<style lang="scss">
  header{
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
</style>
