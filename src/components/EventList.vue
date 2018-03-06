<template>
  <div class="eventList">
    <EventItem v-for="event in events" :key="event.id" :eventData="event"/>
  </div>
</template>

<script>
  import xml2js from 'xml2js'
  import moment from 'moment'
  import _ from 'underscore'

  async function getList() {
    // room reserve
    // http://host6.evanced.info/richland/evanced/eventsxml.asp?nd=7&roominfo=1&loc=Meeting%20Space%20211&dm=rss2
    
    // events
    // 'https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=1&alltime=0&dm=exml'

    // https://stackoverflow.com/a/41009103
    const url = 'https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=18&alltime=1&dm=exml'
    let xmlString = await fetch(url)
    .then(response => response.text())

    const options = {trim:true, explicitArray:false, emptyTag:undefined}
    let eventArray = []
    xml2js.parseString(xmlString, options, (error,result) => {
      if(error){
        console.error('OMG',error);
      }else{
        eventArray = result.event.item
      }
    })
    console.log('event array',eventArray)

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
      // eventItem.time = moment(eventItem.iso_start).format('h:mm a') + '.M.';
      // eventItem.endtime = moment(eventItem.iso_end).format('h:mm a') + '.M.';
      // fake number of registrations
      // if(eventItem.signup == 1) eventItem.signup_openings = Math.floor(Math.random()*30);
    });

    // just the events that are still happening
    eventArray = eventArray.filter(event => event.iso_end >= (new Date()))
    // let eventItem = eventArray[0]
    // let a = new Date(eventItem.iso_end)
    // let b = new Date()
    // console.log(a,b, a<b, a>b)

    // eventArray = eventArray.filter(eventItem => (new Date(eventItem.iso_end)) < (new Date()))

    return eventArray
  }

  import EventItem from './EventItem'

  export default {
    name: 'EventList',
    data: () => {
      return {
        events: []
      }
    },
    components: {EventItem},
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
</style>
