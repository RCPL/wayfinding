<template>
  <section>
    <div class="time">{{currentTime}}</div>
    <div>{{currentDate}}</div>
    <!-- <Weather/> -->
  </section>
</template>

<script>
  import { DateTime } from "luxon"
  // import Weather from './Weather'
  export default {
    name:'Clock',
    computed: {
      currentTime: function() {
        return DateTime.fromJSDate(this.$store.state.time).toFormat('h:mm a')
      },
      currentDate: function() {
        return DateTime.fromJSDate(this.$store.state.time).toFormat('cccc, MMMM d')
      }
    }
  }
</script>

<style lang="scss" scoped>
  section{
    display:flex;
    flex-direction:row;
    background-color: rgb(14, 119, 151);
    padding:0.5em 2vw;
    color:white;
    font-size:155%;
  }
  .time{
    width:28vw;
  }
</style>
