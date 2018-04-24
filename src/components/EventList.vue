<!--
EVANCED API
http://host6.evanced.info/richland/evanced/eventsxml.asp?

dm=
  rss2
  xml
  exml

lib=
  all
  0 Main
  1 Ballentine
  2 Blythewood
  3 Cooper
  4 Eastover",
  5 North Main",
  6 Northeast",
  7 Sandhills",
  8 Southeast",
  9 St. Andrews",
  10 Wheatley",
  11 Richland Library Operations Center",
  19 Coworking Center
  21 Coworking Center Mac Station

loc=Meeting%20Space%20211 (Meeting Space 211)

roominfo=1
alltime=1

nd=7
startdate=03-08-2018
enddate=03-24-2018
-->

<template>
  <div class="eventList">
    <div>
      <EventItem v-for="event in now" :key="event.id" :eventData="event"/>
    </div>
    <div class="sub-list">
      <EventItem v-for="event in later" :key="event.id" :eventData="event"/>
    </div>
  </div>
</template>

<script>
  import xml2js from 'xml2js'
  import moment from 'moment'
  import vueinterval from 'vue-interval/dist/VueInterval.common'
  import evancedRooms from '../../static/data/evancedRooms.json'

  import EventItem from './EventItem'

    async function getList(reservations) {

    // How to fetch XML
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

    // remove parking spaces
    eventArray = eventArray.filter(event => event.location !== 'Reserved Parking Spot 1')
    eventArray = eventArray.filter(event => event.location !== 'Reserved Parking Spot 2')

    // clean the data so that it's actually useful
    eventArray.forEach( eventItem => {

      // the end date isn't set when it's the same as the start date
      eventItem.enddate = eventItem.enddate || eventItem.date

      // set start and end times for all day events to standard room hours 9am-8:45pm 
      if(eventItem.time === "All Day"){  
        eventItem.iso_start = moment(new Date(eventItem.date)).set({hour: 9, minute:0})._d;
        eventItem.iso_end = moment(new Date(eventItem.enddate)).set({hour: 20, minute:45})._d;
      
      // convert string datetime into a real date object
      }else{
        eventItem.iso_start = new Date(eventItem.date + ' ' + eventItem.time);
        eventItem.iso_end = new Date(eventItem.enddate + ' ' + eventItem.endtime);
      }

      // create floor number and room ID from evanced lookup object
      eventItem.floor = -1;
      eventItem.room_id = -1;
      if(evancedRooms[eventItem.library] !== undefined) {
        if(evancedRooms[eventItem.library][eventItem.location] !== undefined){
          eventItem.floor = evancedRooms[eventItem.library][eventItem.location].floor
          eventItem.room_id = evancedRooms[eventItem.library][eventItem.location].id
        }else{
          console.error(`no room for /${eventItem.location}/`)
        }
      }else{
        console.error(`no library for /${eventItem.library}/`)
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
    computed: {
      now: function(){ return this.events.filter(event => event.now)},
      later: function(){ return this.events.filter(event => !event.now)}
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
