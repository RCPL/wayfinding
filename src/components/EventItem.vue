<template>
  <section class="eventItem" @touchstart="tapped">
    <div class="times">
      <h2 class="big">{{eventData.time}}</h2>
      <h3 class="little">til {{eventData.endtime}}</h3>
    </div>

    <div class="about">
      <h2>{{eventData.title}}</h2>
      <h3>{{eventData.location}}</h3>
    </div>
  </section>  
</template>

<script>
import evancedRooms from '../../static/data/evancedRooms.json'
export default {
  name: 'EventItem',
  props: ['eventData'],
  methods: {
    tapped() {
      //console.log('you just tapped', this.eventData.location)
      let room = this.eventData.location;
      let lib = this.eventData.library;
      console.log(evancedRooms[lib][room])
    }
  }
}
</script>

<style lang="scss" scoped>
  .eventItem{
    display:flex;
    flex-direction: row;

    h2{ font-size:1.1rem; margin-bottom: 0.1em;}
    h3{ font-size: 1rem; margin-top: 0.2rem;}
  }

  .times{
    width:28vw;
  }

  .about{
    flex:1;
  }
</style>
