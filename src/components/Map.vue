<template>
  <div class="map-module">
    <div id="map" style='width: 100%; height: 100%;'></div>
    <nav>
      <div @touchstart="getLevel(3)" :class="{viewing: floor === 3, your_level: kiosk_floor === 3}">3</div>
      <div @touchstart="getLevel(2)" :class="{viewing: floor === 2, your_level: kiosk_floor === 2}">2</div>
      <div @touchstart="getLevel(1)" :class="{viewing: floor === 1, your_level: kiosk_floor === 1}">1</div>
      <div @touchstart="getLevel(0)" :class="{viewing: floor === 0, your_level: kiosk_floor === 0}">G</div>
    </nav>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA';
  var map;

  export default {
    name: 'map-module',
    computed: mapState ({
      kiosk_floor: state => state.defaults.floor,
      floor: 'floor',
      zoom: 'zoom',
      bearing: 'bearing',
      center: 'center'
    }),
    mounted: function() {
      map = new mapboxgl.Map({
          container: this.$el.querySelector('#map'),
          style: 'mapbox://styles/mapbox/light-v9',
          zoom: this.zoom,
          center: this.center,
          bearing: this.bearing,
          pitch:25
      });

      map.on('load', function () {

        map.addSource('indoorLabels',{
          type: 'geojson',
          data: '/static/data/geojson/labels.geojson'
        });

        map.addSource('indoorPolygons',{
          type: 'geojson',
          data: '/static/data/geojson/polygons.geojson'
        });

        map.addLayer({
          'id': 'areas',
          'type': 'fill',
          'source': 'indoorPolygons',
          'paint': {
            'fill-color': 'rgb(194, 202, 186)'
          },
          filter: [
            'all',
            ['==','level_1',1],
            ['!=','type','wall'],
            ['!=','type','window'],
            ['!=','type','staff']
          ]
        });

        map.addLayer({
          'id': 'walls',
          'type': 'fill-extrusion',
          'source': 'indoorPolygons',
          'paint': {
            'fill-extrusion-color': 'rgb(180,180,180)',
            'fill-extrusion-height': 1,
          },
          filter: [
            'all',
            ['==','level_1',1],
            [
              'any',
              ['==','type','wall'],
              ['==','staff',1]
            ]
          ]
        });

        map.addLayer({
          'id': 'windows',
          'type': 'fill-extrusion',
          'source': 'indoorPolygons',
          'paint': {
            'fill-extrusion-color': 'rgb(200,255,220)',
            'fill-extrusion-height': 2,
            'fill-extrusion-opacity': 0.4
          },
          filter: [
            'all',
            ['==','level_1',1],
            ['==','type','window']
          ]
        });

        map.addLayer({
          'id': 'labels',
          'type': 'symbol',
          'source': 'indoorLabels',
          'layout': {
            'text-field': '{label}',
            // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            // "text-offset": [0, 0.6],
            "text-anchor": "top"
          },
          'paint': {
            'text-color': 'black'
          },
          filter: [ 'all',
            ['==','level_1',1],
            ['!=','staff',1]
          ]
        });

        var youAreHere = new mapboxgl.Marker()
          .setLngLat([-81.03723837967836, 34.00443466613849])
          .addTo(map);
      });

      map.on('touchstart', function(e){
        clearTimeout(resetTimer);
      });
      map.on('touchend', function(e){
        clearTimeout(resetTimer);
        resetTimer = setTimeout(()=>{
          console.log('reset the map')
          map.flyTo({
              duration:30000,
              zoom: this.zoom,
              center: this.center,
              bearing: this.bearing,
              pitch: 25
          })
        },3000)
      });

      map.on('click', function(e){
        console.log(e);
      })
    },
    methods: {
      getLevel: function(levelNumber) {
        this.$store.commit('select',{
          floor: levelNumber
        })
        // console.log('set the level filter to',levelNumber)
        map.setFilter('areas',
        [
          'all',
          ['==',`level_${levelNumber}`,1],
          [
            'any',
            ['!=','type','wall'],
            ['!=','type','window'],
            ['!=','type','staff']
          ],
          ['!=','room_id','null']
        ]);

        map.setFilter('walls',
        [
          'all',
          ['==',`level_${levelNumber}`,1],
          [
            'any',
            ['==','type','wall'],
            ['==','staff',1]
          ]
        ]);

        map.setFilter('windows',
        [
          'all',
          ['==',`level_${levelNumber}`,1],
          ['==','type','window'],
        ]);

        map.setFilter('labels',
        [
          'all',
          ['==',`level_${levelNumber}`,1],
          ['!=','staff',1]
        ]);
      }
    }
  }
</script>

<style lang="scss">
  .map-module{
    position:relative;

  nav {
    position: absolute;
    bottom:20%;
    right:5vw;
    background-color:white;
    border-radius: 1em;
    display:flex;
    flex-direction: column;
    text-align:center;
    overflow:hidden;
  }
  nav > *{
    padding:0.5em;
  }
  .viewing{
    background-color:cyan;
  }
  .your_level{
    background-color: red;
    font-weight: 800;
    color: white;
  }


  $room:rgb(194, 202, 186);
  $room_focus: rgb(47, 140, 216);
</style>
