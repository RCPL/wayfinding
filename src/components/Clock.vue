<template>
  <section>
    <div class="time">{{currentTime}}</div>
    <div>{{currentDate}}</div>
    <!-- <Weather/> -->
  </section>
</template>

<script>
  // import { DateTime } from 'luxon'
  import moment from 'moment'
  // import Weather from './Weather'

  var testTime = moment(new Date()).format('h:mm');

  export default {
    name:'Clock',
    data() {
      return {
        testTime: testTime
      }
    },
    computed: {
      currentTime: function() {
        // return DateTime.fromJSDate(this.$store.state.time).toFormat('h:mm a')
        return moment(this.$store.state.time).format('h:mm a')
      },
      currentDate: function() {
        // return DateTime.fromJSDate(this.$store.state.time).toFormat('cccc, MMMM d')
        return moment(this.$store.state.time).format('dddd, MMMM D')
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
