<template>
  <div class="eventList">
    <div>
      <EventItem v-for="event in events" :key="event.id" :eventData="event"/>
    </div>
  </div>
</template>

<script>
  import getList from "../evanced-api";
  import vueinterval from 'vue-interval/dist/VueInterval.common'

  import EventItem from './EventItem'

  export default {
    name: 'EventList',
    data: () => {
      return {
        events: []
      }
    },
    computed: {
      defaultMode: function(){ return this.$store.state.defaultMode }
    },
    watch: {
      defaultMode(e){
        if(e){
          this.$el.scrollTop = 0
        }
      }
    },
    mounted(){
      console.log(this.$el)
    },
    mixins:[vueinterval],
    components: {EventItem},
    methods: {
      INTERVAL__30000$saveList: function() {
        getList(1).then((result) => {
          this.events = result
        })
      }
    },
    created: function() {
      this.INTERVAL__30000$saveList()
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
