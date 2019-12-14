<template>
  <div class="movie_page">
    <header>
      <router-link to="/" class="butt butt_ticket">Home</router-link>
    </header>
    <div class="movie no--border">
      <div class="movie__poster">
          <img :src="movie.pictureLink" :alt="movie.name" class="movie__poster_img">
      </div>
      <div class="movie__info">
        <h2 class="movie__info_title">{{ (''+movie.name).toUpperCase() }}</h2>
        <p class="movie__info_release">Release: <span class="movie__info_color">{{ new Date(''+movie.dateOfRelease).toLocaleString('en', dateOption)}}</span></p>
        <p class="movie__info_genre">Genre: <span class="movie__info_color">{{ genreToString(movie.genre_id) }}</span></p>
        <p class="movie__info_desc">{{''+movie.description}}</p>

      </div>
    </div>
    <bookForm v-bind:id="id"></bookform>
  </div>
</template>

<script>
import axios from 'axios';
import bookForm from '../book_ticket.vue';
export default {
  name: 'app',
  props: ['id'],
  components: { bookForm },
  data () {
    return {
      movie: [],
      loadingMovie: true,
      dateOption: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      genre: {
        'ACTION': 0,
        'ADVENTURES': 1,
        'COMEDY': 2,
        'DRAMA': 3,
        'HORROR': 4,
        'WESTERNS': 5
      }
    }
  },
  methods: {
    genreToString: function(arr){
      if(Array.isArray(arr) ){
        let newArr = arr.map(i => {
          for (var key in this.genre) {
              if(this.genre[key] === i){
                return key;
              }
          }
        })
        return newArr.join(', ');
      }
    },
    getMovie: function(){
      axios
        .get(`https://cinema-api-test.herokuapp.com/movies?movie_id=${this.id}`)
        .then(response => {this.movie = response.data; this.loadingMovie = false})
    }
  },
  created() {
    this.getMovie()
  },
}
</script>

<style lang="scss">
  .no--border{
    border: none !important;
  }
  .movie_page .movie{
    &__info{
      padding-bottom: 20px;
    }
    &__poster{
      align-items: flex-start;
    }
  }
  
</style>
