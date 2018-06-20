<template>
  <div class="eventList">
    <div>
      <EventItem v-for="event in events" :key="event.id" :eventData="event"/>
    </div>
  </div>
</template>

<script>
  import EventItem from './EventItem'

  export default {
    name: 'EventList',
    components: {EventItem},
    computed: {
      events: function(){ return this.$store.state.events },
      defaultMode: function(){ return this.$store.state.defaultMode }
    },
    watch: {
      defaultMode(e){
        if(e){
          this.$el.scrollTop = 0
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .eventList{
    overflow-y: scroll;
  }

  .sub-list{
    padding:0.5em 2vw;
  }
</style>
