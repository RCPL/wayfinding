<template>
  <div class="map-module">
    <div id="map" style='width: 100%; height: 100%;'></div>
    <nav>
      <div @touchstart="getLevel(3)" :class="{viewing: viewing_floor === 3}">3</div>
      <div @touchstart="getLevel(2)" :class="{viewing: viewing_floor === 2}">2</div>
      <div @touchstart="getLevel(1)" :class="{viewing: viewing_floor === 1}">1</div>
      <div @touchstart="getLevel(0)" :class="{viewing: viewing_floor === 0}">G</div>
      <div>{{viewing_floor}}</div>
    </nav>
  </div>
</template>

<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA';
  var map;
  var resetTimer;

  var defaults = {
    zoom: 18.3,
    bearing: -70
  }

  export default {
    name: 'map-module',
    data() { return {
      kiosk_floor: 1,
      kiosk_coordinates: [],
      viewing_floor: 1
    }},
    mounted: function() {
      map = new mapboxgl.Map({
          container: this.$el.querySelector('#map'),
          style: 'mapbox://styles/richlandlibrary/cj49uxv2d2z4u2sl4k0l5q9yx',
          zoom: defaults.zoom,
          center: [ -81.037352, 34.004132],
          bearing: defaults.bearing,
          pitch:25
      });

      map.on('load', function () {

        map.addSource('indoor',{
          type: 'geojson',
          data: '/static/data/geojson/floor-1-polygons.geojson'
        });

        map.addLayer({
          'id': 'regular_areas',
          'type': 'fill',
          'source': 'indoor',
          'paint': {
            'fill-color': 'rgb(194, 202, 186)'
          },
          filter: [ 'all',
            ['!=','type','wall'],
            ['!=','type','window'],
            ['!=','type','staff']
          ]
        });

        map.addLayer({
          'id': 'walls',
          'type': 'fill-extrusion',
          'source': 'indoor',
          'paint': {
            'fill-extrusion-color': 'white',
            'fill-extrusion-height': 0.5,
          },
          filter: [
            'any',
            ['==','type','wall'],
            ['==','type','staff']
          ]
        });

        map.addLayer({
          'id': 'windows',
          'type': 'fill-extrusion',
          'source': 'indoor',
          'paint': {
            'fill-extrusion-color': 'rgb(200,255,220)',
            'fill-extrusion-height': 1,
            'fill-extrusion-opacity': 0.4
          },
          filter: ['==','type','window']
        });

        // map.addLayer({
        //   'id': 'windows',
        //   'type': 'fill-extrusion',
        //   'source': 'indoor',
        //   'source-layer': 'Richland_Library_Indoors',
        //   'paint': {
        //     'fill-extrusion-color': 'white',
        //     'fill-extrusion-height': 1,
        //   },
        //   filter: [ 'all',
        //     ['==','type','wall'],
        //     ['==','level_0',1]
        //   ]
        // });

        // map.addLayer({
        //   'id': 'labels',
        //   'type': 'symbol',
        //   'source': 'indoor',
        //   'source-layer': 'Richland_Library_Indoors',
        //   'paint': {
        //     'text-field': '{label}'
        //   },
        //   filter: [ 'all',
        //     ['>','priority',0],
        //     ['==','level_0',1]
        //   ]
        // });

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
              zoom: defaults.zoom,
              center: [ -81.037352, 34.004132],
              bearing: defaults.bearing,
              pitch: 25
          })
        },3000)
      });

      map.on('click', function(e){
        console.log(e);
      })
    },
    methods: {
      getLevel: (levelNumber) => {
        // console.log(this.viewing_floor)
        this.viewing_floor = levelNumber;

        const level_poly = [
          'level0_poly',
          'level1_poly',
          'level2_poly',
          'level3_poly',
        ];
        const level_labels = [
          'level0_labels',
          'level1_labels',
          'level2_labels',
          'level3_labels',
        ];

        for(let i=0; i<=3; i++){
          const visibility = (i === levelNumber) ? 'visible' : 'none';
          map.setLayoutProperty(level_poly[i], 'visibility', visibility);
          map.setLayoutProperty(level_labels[i], 'visibility', visibility);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map-module{
    position:relative;
  }
  nav {
    position: absolute;
    bottom:20%;
    right:5vw;
    background-color:white;
    border-radius: 1em;
    display:flex;
    flex-direction: column;
    text-align:center;
  }
  nav > *{
    padding:0.5em;
  }
  .your_level{
    background-color: red;
    font-weight: 800;
    color: white;
  }
  .viewing{
    background-color:cyan;
  }

  $room:rgb(194, 202, 186);
  $room_focus: rgb(47, 140, 216);

</style>
