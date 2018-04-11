<template>
  <section>
    <div class="time">{{currentTime}}</div>
    <div>{{currentDate}}</div>
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
        this.INTERVAL__30000$updateClock()
    },
    methods: {
      INTERVAL__30000$updateClock: function(){
        this.currentTime = moment().format('h:mm A')
        this.currentDate = moment().format('dddd, MMMM D')
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
