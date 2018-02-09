<template>
  <span>{{weather}}</span>
</template>

<script>
  async function getWeather() {
    const url = 'https://api.darksky.net/forecast/58ba66075ea2fd57dc18510a24007ca9/34.004625,-81.037160'
    const jsonData = await fetch(url)
    .then(response => response.json())

    console.log('jsonData',jsonData)

    return jsonData
  }

  import moment from 'moment'
  export default {
    name:'Weather',
    data() {
      return {
        weather: '58.3℉ Partly Cloudy'
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
      // this.updateWeather();
    },
    methods: {
      updateWeather() {
        this.weather = getWeather();
      }
    }
  }
</script>

<style lang="scss" scoped>
span {
  font-size: 1rem;
  opacity: 0.5;
}
</style>