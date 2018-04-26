<template>
  <section>
    <div class="time">{{currentTime}}</div>
    <div>{{currentDate}}</div>
    <!-- <Weather/> -->
  </section>
</template>

<script>
  import { DateTime } from "luxon"
  import vueinterval from 'vue-interval/dist/VueInterval.common'
  // import Weather from './Weather'
  export default {
    name:'Clock',
    mixins:[vueinterval],
    // components: {Weather},
    data() {
      return {
        currentTime: '[clock error]',
        currentDate: '[date error]'
      }
    },
    created() {
        this.INTERVAL__30000$updateClock()
    },
    methods: {
      INTERVAL__30000$updateClock: function(){
        this.currentTime = DateTime.local().toFormat('h:mm a')
        this.currentDate = DateTime.local().toFormat('cccc, MMMM d')
        // console.log('clock updated');
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
