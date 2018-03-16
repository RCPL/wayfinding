<template>
  <div class="eventList">
    <EventItem v-for="event in events" :key="event.id" :eventData="event"/>
  </div>
</template>

<script>
  import xml2js from 'xml2js'
  import moment from 'moment'
  import _ from 'underscore'

  import EventItem from './EventItem'

    async function getList(reservations) {
    // room reserve
    // http://host6.evanced.info/richland/evanced/eventsxml.asp?nd=7&roominfo=1&loc=Meeting%20Space%20211&dm=rss2
    
    // events
    // 'https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=1&alltime=0&dm=exml'

    // https://stackoverflow.com/a/41009103
    const url = `https://host6.evanced.info/richland/evanced/eventsxml.asp?lib=0&nd=1&alltime=1&roominfo=${reservations}&dm=xml`
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

    // clean the data so that it's actually useful
    _.each(eventArray, eventItem => {
      if(eventItem.time === "All Day"){
        // set start and end times for all day events to standard room hours 9am-8:45pm
        eventItem.iso_start = moment(new Date(eventItem.date)).set({hour: 9, minute:0})._d;
        eventItem.iso_end = moment(new Date(eventItem.enddate || eventItem.date)).set({hour: 20, minute:45})._d;
      }else{
        eventItem.iso_start = new Date(eventItem.date + ' ' + eventItem.time);
        eventItem.iso_end = new Date(eventItem.date + ' ' + eventItem.endtime);
      }

      // boolean if the event is currently happening
      eventItem.now = (eventItem.iso_start < (new Date()) && eventItem.iso_end > (new Date()))

      // eventItem.eventtypes = _.without(eventItem.eventtypes.split(', '),',',' ','  ');
      // eventItem.agegroups = _.without(eventItem.agegroups.split(', '),',','',' ','  ');
      // eventItem.time = moment(eventItem.iso_start).format('h:mm a') + '.M.';
      // eventItem.endtime = moment(eventItem.iso_end).format('h:mm a') + '.M.';
      // fake number of registrations
      // if(eventItem.signup == 1) eventItem.signup_openings = Math.floor(Math.random()*30);
    })

    // just the events that are still happening
    eventArray = eventArray.filter(event => event.iso_end >= (new Date()))

    // sort by start time then end time
    eventArray = eventArray.sort(function(a,b){
      const c = a.iso_start - b.iso_start
      if(c === 0){
        return a.iso_end - b.iso_end
      }else{
        return c;
      }
    })

    return eventArray
  }

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
