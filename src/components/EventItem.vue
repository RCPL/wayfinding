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

    <div class="up-or-down">
      <div v-if="floor > 0">{{floor}}</div>
      <div v-else>G</div>
      <svg viewBox="0 0 128 96">
        <path d="M 0,96 64,0 128,96 Z" v-if="up"/>
        <path d="M 0,0 64,96 128,0 Z" v-if="down"/>
      </svg>
    </div>
  </section>  
</template>

<script>
import config from '../config'
import evancedRooms from '../../static/data/evancedRooms.json'
export default {
  name: 'EventItem',
  props: ['eventData'],
  computed: {
    floor: function() {return evancedRooms[this.eventData.library][this.eventData.location].floor || '-1' },
    room_id: function() {return evancedRooms[this.eventData.library][this.eventData.location].id },
    up: function() {return this.floor > config.kioskFloor},
    down: function() {return this.floor < config.kioskFloor}
  },
  methods: {
    tapped() {
      // //console.log('you just tapped', this.eventData.location)
      // let room = this.eventData.location;
      // let lib = this.eventData.library;
      // console.log(evancedRooms[lib][room])
      console.log(this.room_id)
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

  .up-or-down {
    display:flex;
    flex-direction: row;
    text-align: right;
    font-size:2rem;
    font-weight:900;
    padding-top: 1rem;
  }

  .up-or-down svg {
    height:1em;
    width:auto;
    padding-top:0.125em;
  }
</style>
