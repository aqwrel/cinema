<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
  *{
    margin: 0;
    padding: 0
  }
  body{
    color: #fff;
    background: #221f1f;
    font-family: 'Roboto', sans-serif;
    letter-spacing: .5px;
    line-height: 1.3;
  }
  #app{
    min-height: 100vh;
    max-width: 992px;
    margin: 0 auto;
  }
  .butt{
    line-height: 18px;
    font-size: 18px;
    padding: 16px 32px;
    display: inline-block;
    border-radius: 8px;
    text-decoration: none;
  }
  .butt_ticket{
    background: #ff0000;
    outline-color: #ff0000;
    color: #fff;
  }
</style>
