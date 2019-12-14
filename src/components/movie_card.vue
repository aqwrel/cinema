<template>
  <div class="movie">
    <div class="movie__poster">
        <img :src="data.pictureLink" :alt="data.name" class="movie__poster_img">
    </div>
    <div class="movie__info">
      <h2 class="movie__info_title">{{ (data.name).toUpperCase() }}</h2>
      <p class="movie__info_release">Release: <span class="movie__info_color">{{ new Date(data.dateOfRelease).toLocaleString('en', dateOption)}}</span></p>
      <p class="movie__info_genre">Genre: <span class="movie__info_color">{{ genreToString(data.genre_id) }}</span></p>
      <p class="movie__info_desc">{{data.description}}</p>

      <router-link :to="'/movie/' + data._id" class="butt butt_ticket">Buy ticket</router-link>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'movie',
  props: ['data'],
  data () {
    return {
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
}
</script>

<style lang="scss">
  .movie{
    display: flex;
    margin-bottom: 30px;
    border: 1px solid rgba(255,255,255,.5);
    border-radius: 8px;
    position: relative;
    &__poster{
      width: 200px;
      display: flex;
      align-items: center;
      &_img{
        max-width: 100%;
        border-radius: 8px;
      }
    }
    &__info{
      width: calc(100% - 200px);
      padding: 20px;
      padding-top: 5px;
      padding-bottom: 90px;
      &_color{
        color: rgba(255,255,255,.5);
      }
      &_title{
        font-size: 28px;
        line-height: 34px;
        color: #fff;
        font-weight: 500;
        margin-bottom: 5px;
      }
      &_desc{
        padding-top: 15px;
      }
      .butt_ticket{
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  }
  
</style>
