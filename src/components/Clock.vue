<template>
  <section>
    <span>{{currentTime}}</span>
    <span>{{currentDate}}</span>
    <Weather/>
  </section>
</template>

<script>
  import moment from 'moment'
  import Weather from './Weather'
  export default {
    name:'Clock',
    components: {Weather},
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
