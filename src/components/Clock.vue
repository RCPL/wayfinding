<template>
  <section>
    <time>{{currentTime}}</time>
    <date>{{currentDate}}</date>
  </section>
</template>

<script>
  import moment from 'moment'
  export default {
    name:'Clock',
    computed: {
      currentTime: () => moment().format('h:mma'),
      currentDate: () => moment().format('dddd MMMM DD')
    }
  }
</script>

<style lang="scss" scoped>
  section{
    background-color: rgb(12, 125, 160);
    padding:0.5em 1em;
    color:white;
    font-weight:900;
    font-size:150%;
  }
  time{
    width:345px;
  }
</style>
