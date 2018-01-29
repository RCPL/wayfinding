<template>
  <div>
    <code>{{events}}</code>
    <section v-for="event in events" :key="event.id._text">
      <h2>{{event.title._text}}</h2>
      <h3>2:30 til 4:00 pm</h3>
      <h3>{{event.space}}</h3>
      <!-- <p>{{event.description}}</p> -->
    </section>
  </div>
</template>

<script>
  // var parseString = require('xml-js').parseString
  import xml2js from 'xml2js'
  async function getList() {
    // https://stackoverflow.com/a/41009103
    const url = 'http://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=1&alltime=1&dm=exml'
    let xmlString = await fetch(url)
    .then(response => response.text())

    const options = {trim:true, explicitArray:false, emptyTag:undefined}
    let obj = {}
    xml2js.parseString(xmlString, (error,result) => {
      if(error){
        console.error('OMG',error);
      }else{
        obj = result
      }
    })

    console.log('result',obj)
    return obj
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
        getList().then((obj) => {
          this.events = obj.event.item
        })
      }
    },
    mounted: function() {
      this.saveList();
    }
  }

/*

methods: {
    getCardList: function() {
      listRecords(`${airtableURL}?api_key=${airtableKey}`)
      .then((records) => {
        cardList = records;
      });
    },
    buildHand: function(){
      console.log('card list', cardList);
      let cursor = Math.floor(Math.random()*(cardList.length - cardsPerHand - 1))
      this.cards = cardList.splice(cursor,cardsPerHand);
    },
    getCard: function(id) {
      getRecord(`${airtableURL}/${id}?api_key=${airtableKey}`)
      .then((record) => {
        console.log('ze card',record);
      });
    }
  },
  mounted: function() {
    this.getCardList();
  }
*/
</script>

<style lang="scss" scoped>
</style>

