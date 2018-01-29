<template>
  <div>
    <section v-for="event in events" :key="event.id._text">
      <h2>{{event.title}}</h2>
      <h3>2:30 til 4:00 pm</h3>
      <h3>{{event.space}}</h3>
      <!-- <p>{{event.description}}</p> -->
    </section>
  </div>
</template>

<script>
  var convert = require('xml-js')
  async function getList() {
    console.log('getting list');
    const url = 'http://host6.evanced.info/richland/evanced/eventsxml.asp?lib=all&nd=1&alltime=1&dm=exml'
    const response = await fetch(url)
    
    const dummy = `
<?xml version="1.0" encoding="ISO-8859-1"?><event>
<item>
<title>Mother Goose Storytime</title>
<date>Monday, January 29, 2018</date>
<time>10:00 AM</time>
<enddate></enddate>
<description>Introduce your baby to the world of books and nurture a love of reading with stories, rhymes, and songs. This storytime is geared for crawlers. </description>
<location>Sandhills Storytime Room</location>
<library>Richland Library  Sandhills </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=61692</link>
<id>61692</id>
<recordtype>2</recordtype>
<RCID>4318</RCID>
<date1>2018/01/29</date1>
<date2>201801291000Mother Goose Storytime</date2>
<enddate1></enddate1>
<length>45</length>
<status></status>
<endtime>10:45 AM</endtime>
<prieventtype>Storytime</prieventtype>
<eventtypes>Storytime, Z - EARLY LITERACY, </eventtypes>
<eventtype1>Storytime</eventtype1>
<eventtype2>Z - EARLY LITERACY</eventtype2>
<eventtype3></eventtype3>
<agegroups>Babies up to 12 months, Programs for Families</agegroups>
<agegroup1>Babies up to 12 months</agegroup1>
<agegroup2>Programs for Families</agegroup2>
<agegroup3></agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter></presenter>
<signup>0</signup>
<signupstarts></signupstarts>
<signupends></signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath></imagepath>
<imagetext></imagetext>
<imageheight></imageheight>
<imagewidth></imagewidth>
<lastupdated>2018-01-25T11:44:49Z</lastupdated>
<extratag></extratag>
</item>
<item>
<title>Wirework for Beaders </title>
<date>Monday, January 29, 2018</date>
<time>4:00 PM</time>
<enddate></enddate>
<description>Learn how to use wire effectively in your beaded jewelry in this beginner's workshop. We will create wrapped wire loops, beaded links, and more, and you will take home a completed jewelry set of your own creation.</description>
<location>Sandhills Children's Maker</location>
<library>Richland Library  Sandhills </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=60538</link>
<id>60538</id>
<recordtype>0</recordtype>
<RCID>0</RCID>
<date1>2018/01/29</date1>
<date2>201801291600Wirework for Beaders </date2>
<enddate1></enddate1>
<length>90</length>
<status></status>
<endtime>5:30 PM</endtime>
<prieventtype>Z - CULTURAL &amp; ARTS</prieventtype>
<eventtypes>Z - CULTURAL &amp; ARTS, Maker, </eventtypes>
<eventtype1>Z - CULTURAL &amp; ARTS</eventtype1>
<eventtype2>Maker</eventtype2>
<eventtype3></eventtype3>
<agegroups>Programs for Adults, Adults</agegroups>
<agegroup1>Programs for Adults</agegroup1>
<agegroup2>Adults</agegroup2>
<agegroup3></agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter></presenter>
<signup>1</signup>
<signupstarts></signupstarts>
<signupends></signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath></imagepath>
<imagetext></imagetext>
<imageheight></imageheight>
<imagewidth></imagewidth>
<lastupdated>2017-12-26T12:48:22Z</lastupdated>
<extratag></extratag>
</item>
<item>
<title> One Point Perspective Drawing 101</title>
<date>Monday, January 29, 2018</date>
<time>6:00 PM</time>
<enddate></enddate>
<description>Understanding perspective in drawing is a key fundamental in art. Come out learn the basic One point.</description>
<location>Studio 220</location>
<library>Richland Library  Main </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=61253</link>
<id>61253</id>
<recordtype>0</recordtype>
<RCID>0</RCID>
<date1>2018/01/29</date1>
<date2>201801291800 One Point Perspective Drawing 101</date2>
<enddate1></enddate1>
<length>75</length>
<status></status>
<endtime>7:15 PM</endtime>
<prieventtype>Maker</prieventtype>
<eventtypes>Maker, Z - CULTURAL &amp; ARTS, </eventtypes>
<eventtype1>Maker</eventtype1>
<eventtype2>Z - CULTURAL &amp; ARTS</eventtype2>
<eventtype3></eventtype3>
<agegroups>Adults</agegroups>
<agegroup1>Adults</agegroup1>
<agegroup2></agegroup2>
<agegroup3></agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter></presenter>
<signup>0</signup>
<signupstarts></signupstarts>
<signupends></signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath></imagepath>
<imagetext></imagetext>
<imageheight></imageheight>
<imagewidth></imagewidth>
<lastupdated>2018-01-08T13:58:49Z</lastupdated>
<extratag></extratag>
</item>
<item>
<title>LEGO Madness</title>
<date>Monday, January 29, 2018</date>
<time>6:00 PM</time>
<enddate></enddate>
<description>Create robots, cities, creatures and more with LEGO building blocks.</description>
<location>St. Andrews Makerspace</location>
<library>Richland Library  St. Andrews </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=61606</link>
<id>61606</id>
<recordtype>2</recordtype>
<RCID>5285</RCID>
<date1>2018/01/29</date1>
<date2>201801291800LEGO Madness</date2>
<enddate1></enddate1>
<length>90</length>
<status></status>
<endtime>7:30 PM</endtime>
<prieventtype>Children</prieventtype>
<eventtypes>Children, Gaming, </eventtypes>
<eventtype1>Children</eventtype1>
<eventtype2>Gaming</eventtype2>
<eventtype3></eventtype3>
<agegroups>6-8, 9-12, Programs for School Age Children</agegroups>
<agegroup1>6-8</agegroup1>
<agegroup2>9-12</agegroup2>
<agegroup3>Programs for School Age Children</agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter></presenter>
<signup>0</signup>
<signupstarts></signupstarts>
<signupends></signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath>http://i205.photobucket.com/albums/bb54/rfranco3/LegoImage_zpsa15c37f1.jpg</imagepath>
<imagetext></imagetext>
<imageheight>391</imageheight>
<imagewidth>547</imagewidth>
<lastupdated>2018-01-23T15:36:59Z</lastupdated>
<extratag></extratag>
</item>
<item>
<title>Microsoft Excel (2013)</title>
<date>Monday, January 29, 2018</date>
<time>6:30 PM</time>
<enddate></enddate>
<description>Learn the basics of building a spreadsheet, creating charts and performing calculations using Microsoft Excel (2013). &lt;br /&gt;Prerequisite: Microsoft Word (2013) class or solid Word experience.&lt;br /&gt;</description>
<location>BCR Classroom</location>
<library>Richland Library  Main </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=60623</link>
<id>60623</id>
<recordtype>0</recordtype>
<RCID>0</RCID>
<date1>2018/01/29</date1>
<date2>201801291830Microsoft Excel (2013)</date2>
<enddate1></enddate1>
<length>120</length>
<status></status>
<endtime>8:30 PM</endtime>
<prieventtype>Computer Class</prieventtype>
<eventtypes>Computer Class, , Z - COMPUTERS &amp; TECHNOLOGY</eventtypes>
<eventtype1>Computer Class</eventtype1>
<eventtype2></eventtype2>
<eventtype3>Z - COMPUTERS &amp; TECHNOLOGY</eventtype3>
<agegroups>Adults, Programs for Adults</agegroups>
<agegroup1>Adults</agegroup1>
<agegroup2>Programs for Adults</agegroup2>
<agegroup3></agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter></presenter>
<signup>1</signup>
<signupstarts>12/15/2017 </signupstarts>
<signupends>1/28/2018 </signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath></imagepath>
<imagetext></imagetext>
<imageheight></imageheight>
<imagewidth></imagewidth>
<lastupdated>2018-01-09T11:40:54Z</lastupdated>
<extratag></extratag>
</item>
<item>
<title>Say "Hola" to Stories</title>
<date>Monday, January 29, 2018</date>
<time>6:30 PM</time>
<enddate></enddate>
<description>Venga a disfrutar cuentos en bilingues en ingles y espanol. &lt;br /&gt;Come enjoy bilingual stories in English and Spanish.</description>
<location>Sandhills Storytime Room</location>
<library>Richland Library  Sandhills </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=61282</link>
<id>61282</id>
<recordtype>2</recordtype>
<RCID>4488</RCID>
<date1>2018/01/29</date1>
<date2>201801291830Say "Hola" to Stories</date2>
<enddate1></enddate1>
<length>60</length>
<status></status>
<endtime>7:30 PM</endtime>
<prieventtype>Storytime</prieventtype>
<eventtypes>Storytime, , Z - EARLY LITERACY</eventtypes>
<eventtype1>Storytime</eventtype1>
<eventtype2></eventtype2>
<eventtype3>Z - EARLY LITERACY</eventtype3>
<agegroups>Children All Ages, Programs for Families</agegroups>
<agegroup1>Children All Ages</agegroup1>
<agegroup2>Programs for Families</agegroup2>
<agegroup3></agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter>Gert Wells</presenter>
<signup>0</signup>
<signupstarts></signupstarts>
<signupends></signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath></imagepath>
<imagetext></imagetext>
<imageheight></imageheight>
<imagewidth></imagewidth>
<lastupdated>2018-01-09T13:23:04Z</lastupdated>
<extratag></extratag>
</item>
<item>
<title>Healthy Snacks and Coupon Hacks</title>
<date>Monday, January 29, 2018</date>
<time>6:30 PM</time>
<enddate></enddate>
<description>Learn simple recipes with few ingredients and minimal tools or time! </description>
<location>Sandhills Entry Maker</location>
<library>Richland Library  Sandhills </library>
<link>http://host6.evanced.info/richland/evanced/eventsignup.asp?ID=61368</link>
<id>61368</id>
<recordtype>0</recordtype>
<RCID>0</RCID>
<date1>2018/01/29</date1>
<date2>201801291830Healthy Snacks and Coupon Hacks</date2>
<enddate1></enddate1>
<length>90</length>
<status></status>
<endtime>8:00 PM</endtime>
<prieventtype>Z - CULTURAL &amp; ARTS</prieventtype>
<eventtypes>Z - CULTURAL &amp; ARTS, Maker, </eventtypes>
<eventtype1>Z - CULTURAL &amp; ARTS</eventtype1>
<eventtype2>Maker</eventtype2>
<eventtype3></eventtype3>
<agegroups>Programs for Adults, Adults</agegroups>
<agegroup1>Programs for Adults</agegroup1>
<agegroup2>Adults</agegroup2>
<agegroup3></agegroup3>
<otherinfo></otherinfo>
<featuredevent>0</featuredevent>
<presenter></presenter>
<signup>1</signup>
<signupstarts></signupstarts>
<signupends></signupends>
<contactname></contactname>
<contactphone></contactphone>
<contactemail></contactemail>
<linktext></linktext>
<linkaddress></linkaddress>
<imagepath></imagepath>
<imagetext></imagetext>
<imageheight></imageheight>
<imagewidth></imagewidth>
<lastupdated>2018-01-16T16:13:30Z</lastupdated>
<extratag></extratag>
</item>
</event>
    `;

    const options = {ignoreComment: true, alwaysChildren: true, compact:true}
    const xml = await convert.xml2js(dummy, options)
    
    console.log(xml)
    return xml
  }

  export default {
    name: 'EventList',
    data: () => {
      return {
        events: [
          {
            id: 'aku2e5s2n34f5oa3i6revoaiw',
            timeStart: new Date('January 24 2018, 14:30 edt'),
            timeEnd: new Date('January 24 2018, 16:00 edt'),
            space: 'Career Coaching Center',
            space_number: 310,
            location_full: 'Richland Library Main',
            location_branch: 'Main',
            age_groups: 'Adults (18–55)',
            title: 'Basic Résumé Help',
            description: 'Career Coaches will be available to answer your résumé questions on a first-come, first-served basis.',
            tags: ['Job & Career']
          }
        ]
      }
    },
    methods: {
      saveList: function() {
        getList().then((obj) => {
          this.events = obj.event.item
          console.log('events',this.events)
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

