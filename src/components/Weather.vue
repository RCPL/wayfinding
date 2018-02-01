<template>
  <section>
    Weather!
    <time>{{}}</time>
    
  </section>
</template>

<script>
  async function getWeather() {
    const url = 'https://api.darksky.net/forecast/58ba66075ea2fd57dc18510a24007ca9/37.8267,-122.4233'
    const jsonData = await fetch(url)
    // .then(response => response.json())

    console.log(jsonData)

    return jsonData
  }

  import moment from 'moment'
  export default {
    name:'Weather',
    data() {
      return {
        weather: {}
      }
    },
    computed: {
      currentTime: () => moment().format('h:mma'),
      currentDate: () => moment().format('dddd MMMM DD')
    },
    mounted: function() {
      // getWeather();
      // this.weather = getWeather();
      // console.log('weather',this.weather)
      this.updateWeather();
    },
    methods: {
      updateWeather() {
        this.weather = getWeather();
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
