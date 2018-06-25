<template>
  <section class="eventItem" @touchstart="tapped" :class="{now: now, selected: selected}">
    <div class="times">
      <h2 class="big">
        <span v-if="now">NOW</span>
        <span v-else>{{eventData.time}}</span>
      </h2>
      <h3 class="little">til {{eventData.endtime}}</h3>
    </div>

    <div class="about">
      <h2>{{eventData.title}}</h2>
      <h3 v-if="now">{{eventData.location}}</h3>
    </div>

    <div class="up-or-down" v-if="(up || down) && now">
      <span v-if="eventData.floor > 0">{{eventData.floor}}</span>
      <span v-else>G</span>
      <svg viewBox="0 0 128 96">
        <path d="M 0,96 64,0 128,96 Z" v-if="up"/>
        <path d="M 0,0 64,96 128,0 Z" v-if="down"/>
      </svg>
      <span class="sup" v-if="up">Up</span>
      <span class="sub" v-if="down">Dn</span>
    </div>
  </section>  
</template>

<script>
export default {
  name: 'EventItem',
  props: ['eventData'],
  computed: {
    up: function() {return this.eventData.floor > this.$store.state.floorStanding},
    down: function() {return this.eventData.floor < this.$store.state.floorStanding},
    now: function() {
      return (
          this.eventData.iso_start <= this.$store.state.time
      ) && (
          this.eventData.iso_end >= this.$store.state.time
      )
    },
    selected: function() {
      return this.$store.state.room_id == this.eventData.room_id
    }
  },
  methods: {
    tapped() {
      this.$store.commit('userSet',{
        room_id: this.eventData.room_id,
        floorViewing: this.eventData.floor
      })
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
    // display:flex;
    // flex-direction: row;
    // text-align: right;
    font-size:2rem;
    font-weight:900;
    padding-top: 1rem;
    svg {
      height:1em;
      width:auto;
      vertical-align:middle;
      margin-bottom:0.25em;
      margin-left:-0.2em;
      path{
        fill: white;
      }
    }
    .sup,.sub {
      font-size:50%;
      margin-left:-0.75em;
    }
    .sup{
      vertical-align:text-top;
    }
    .sub{
      vertical-align:baseline;
    }
  }

  .now{
    color:white;
    background-color: rgb(14, 119, 151);
    padding:0.5em 2vw;
  }

  .selected{
    color:black;
    background-color:lime;
  }


</style>
