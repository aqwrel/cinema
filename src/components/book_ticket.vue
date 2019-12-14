<template>
  <div class="book_form" >

    <h2 class="page_title">Book Ticket</h2>

    <p class="starttime">Start time: {{ new Date(''+book.startTime).toLocaleString('en', dateOption)}}</p>
    <p class="cost">Cost: {{book.ticketPrice}} $</p>

    <p v-if="errorText" class="cost">{{errorText}}</p>

    <ul class="booking__form">
      <li class="booking__form_item" v-for="(place, index) in book.places" v-bind:key="place.id">
        <input type="radio" class="booking__form_item_radio"
          v-for="position in place"  :value='index + " " + position.position'
          v-bind:key="position._id" name="position"
          :disabled="position.isFree == false"
          v-model="picked"
        >
      </li>
    </ul>
    <button type="button" class="butt butt_book" v-on:click='bookTicket'>Book</button>

    <modal v-if="showModal" @close="showModal = false" v-bind:data="[picked, reservationCode]"></modal>

  </div>
</template>

<script>
import axios from 'axios';
import modal from './modal.vue'
export default {
  name: 'app',
  components: { modal },
  props: ['id'],
  data () {
    return {
      book: [],
      dateOption: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      picked: '',
      reservationCode: '',
      showModal: false,
      errorText: ''
    }
  },
  methods: {
    bookTicket: function(){
      if(!this.picked.length){
        return this.errorText = 'Please, choose a place!';
      }
      this.errorText = '';
      let book = this.picked.split(' ');
      let params = {
          movieShow_id : this.book._id,
          row_id : parseInt(book[0]),
          place_position : parseInt(book[1]),
          isFree : false
      };
      fetch(`https://cinema-api-test.herokuapp.com/bookingPlace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(params)
      })
      .then(response => response.text())
      .then(response => {
        this.reservationCode = response;
        this.showModal = true;
        this.getFilm();
      })
      .catch(error => console.error(error));
    },
    getFilm: function(){
      axios
        .get(`https://cinema-api-test.herokuapp.com/movieShows?movie_id=${this.id}`)
        .then(response => (this.book = response.data))
    }
  },
  created() {
    this.getFilm()
  },
}
</script>

<style lang="scss">
  .page_title{
    text-align: center;
    padding-bottom: 20px;
  }
  .cost{
    color: #ff0000;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
  }
  .starttime{
    text-align: center;
  }
  .book_form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .butt_book{
    background: #ff0000;
    border: none;
    color: #fff;
    margin-top: 20px;
    width: 120px;
    text-align: center; 
  }
  .booking__form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin-top: 20px;
    &_item{
      &_radio{
        margin-right: 5px;
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
  }
  .overlay{
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8)
  }
  .reservation_popup{
    position: absolute;
    width: 320px;
    background: #fff;
    color: #000;
    padding: 15px 40px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 320px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-body {
  margin: 20px 0;
  color: #000;
}
.modal-footer{
  display: flex;
  justify-content: center;
}
.modal-footer .butt{
  border: none;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
