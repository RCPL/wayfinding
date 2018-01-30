<template>
  <div>
    <section v-for="event in events" :key="event.id" class="eventItem">
      <div class="times">
        <h2 class="big">{{event.time}}</h2>
        <h3 class="little">til {{event.endtime}}</h3>
      </div>

      <div class="about">
        <h2>{{event.title}}</h2>
        <h3>{{event.location}}</h3>
      </div>
    </section>
  </div>
</template>

<script>
  import _ from 'underscore'
  import xml2js from 'xml2js'

  async function getList() {
    // https://stackoverflow.com/a/41009103
    const url = 'https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=1&alltime=1&dm=exml'
    let xmlString = await fetch(url)
    .then(response => response.text())

    const options = {trim:true, explicitArray:false, emptyTag:undefined}
    let eventArray = {}
    xml2js.parseString(xmlString, options, (error,result) => {
      if(error){
        console.error('OMG',error);
      }else{
        eventArray = result.event.item
      }
    })

    // just main
    eventArray =  _.where(eventArray, {library: "Richland Library  Main"})

    // clean the data so that it's actually useful
    _.each(eventArray, eventItem => {
      if(eventItem.time === "All Day"){
        eventItem.iso_start = moment(new Date(eventItem.date)).startOf('day')._d;
        eventItem.iso_end = moment(new Date(eventItem.date)).endOf('day')._d;
      }else{
        eventItem.iso_start = new Date(eventItem.date + ' ' + eventItem.time);
        eventItem.iso_end = new Date(eventItem.date + ' ' + eventItem.endtime);
      }
      eventItem.eventtypes = _.without(eventItem.eventtypes.split(', '),',',' ','  ');
      eventItem.agegroups = _.without(eventItem.agegroups.split(', '),',','',' ','  ');
      if(eventItem.signup == 1) eventItem.signup_openings = Math.floor(Math.random()*30);
    });

    return eventArray
  }

  export default {
    name: 'EventList',
    data: () => {
      return {
        events: []
      }
    },
    methods: {
      saveList: function() {
        getList().then((newList) => {
          this.events = newList
          console.log('newList',newList);
        })
      }
    },
    mounted: function() {
      this.saveList();
    }
  }

</script>

<style lang="scss" scoped>
  .eventItem{
    display:flex;
    flex-direction: row;
  }

  .times{
    width:345px;
  }

  .about{
    flex:1;
  }
</style>
