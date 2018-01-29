<template>
  <div>

    <section v-for="event in events" :key="event.id._text">
      <h2>{{event.title[0]}}</h2>

      <h3>{{event.time[0]}} til {{event.endtime[0]}}</h3>
      <!-- <h3>{{event.space}}</h3> -->
      <!-- <p>{{event.library[0]}}</p> -->
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
    xml2js.parseString(xmlString, (error,result) => {
      if(error){
        console.error('OMG',error);
      }else{
        eventArray = result.event.item
      }
    })

    eventArray = _.filter(eventArray, event => event.library[0] == "Richland Library  Main ")

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
          console.log(newList);
        })
      }
    },
    mounted: function() {
      this.saveList();
    }
  }

</script>

<style lang="scss" scoped>
</style>

