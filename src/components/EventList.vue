<template>
  <div class="eventList">
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
    const url = 'https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=1&alltime=0&dm=exml'
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
    eventArray = eventArray.filter(event => event.library === "Richland Library  Main")

    // clean the data so that it's actually useful
    _.each(eventArray, eventItem => {
      if(eventItem.time === "All Day"){
        // set start and end times for all day events to standard room hours 9am-8:45pm
        eventItem.iso_start = moment(new Date(eventItem.date)).set({hour: 9, minute:0})._d;
        eventItem.iso_end = moment(new Date(eventItem.date)).set({hour: 20, minute:45})._d;
      }else{
        eventItem.iso_start = new Date(eventItem.date + ' ' + eventItem.time);
        eventItem.iso_end = new Date(eventItem.date + ' ' + eventItem.endtime);
      }
      eventItem.eventtypes = _.without(eventItem.eventtypes.split(', '),',',' ','  ');
      eventItem.agegroups = _.without(eventItem.agegroups.split(', '),',','',' ','  ');
      // fake number of registrations
      // if(eventItem.signup == 1) eventItem.signup_openings = Math.floor(Math.random()*30);
    });

    // just the events that are still happening

    let eventItem = eventArray[0]
    let a = new Date(eventItem.iso_end)
    let b = new Date()
    console.log(a,b, a<b, a>b)

    // eventArray = eventArray.filter(eventItem => (new Date(eventItem.iso_end)) < (new Date()))


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
          // console.log('newList',newList);
        })
      }
    },
    mounted: function() {
      this.saveList();
    }
  }

</script>

<style lang="scss" scoped>
  .eventList{
    overflow-y: scroll;
  }
  .eventItem{
    display:flex;
    flex-direction: row;
  }

  .times{
    width:28vw;
  }

  .about{
    flex:1;
  }
</style>
