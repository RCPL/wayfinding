<template>
  <section>
    <span>{{currentTime}}</span>
    <span>{{currentDate}}</span>
    <!-- <Weather/> -->
  </section>
</template>

<script>
  import moment from 'moment'
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
        this.INTERVAL__5000$updateClock()
    },
    methods: {
      INTERVAL__5000$updateClock: function(){
        this.currentTime = moment().format('hh:mm a')
        this.currentDate = moment().format('dddd MMMM D')
        console.log('updating');
      }
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
