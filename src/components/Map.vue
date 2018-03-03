<template>
  <div class="map-module">
    <div id="map" style='width: 100%; height: 100%;'></div>
    <nav>
      <div @touchstart="getLevel(3)">3</div>
      <div @touchstart="getLevel(2)">2</div>
      <div @touchstart="getLevel(1)" class="your_level">1</div>
      <div @touchstart="getLevel(0)">G</div>
    </nav>
  </div>
</template>

<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA';
  var map;
  var resetTimer;

  var defaults = {
    zoom: 18,
    bearing: -70,
    rooms: {
      'fill-extrusion-color': 'rgb(194, 202, 186)',
      'fill-extrusion-height': 1,
      'fill-extrusion-base': 0
    }
  }

  export default {
    name: 'map-module',
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
        map.addSource('level3',{
          type: 'vector',
          url: 'mapbox://richlandlibrary.cjdko37p3038d2wo76077ti50-2zcor'
        });
        map.addSource('level2',{
          type: 'vector',
          url: 'mapbox://richlandlibrary.cjdeuut5y002x2xpfy8t3v9h4-1yblt'
        });
        map.addSource('level1',{
          type: 'vector',
          url: 'mapbox://richlandlibrary.cjd24maz51ohm2qo4hzg06n8e-8mx1l'
        });
        map.addSource('level0',{
          type: 'vector',
          url: 'mapbox://richlandlibrary.cjdm6sv830an52zs3mjvauu3f-9dlod'
        });

        // level 0
        map.addLayer({
          'id': 'level0_poly',
          'type': 'fill-extrusion',
          'source': 'level0',
          'source-layer': 'Spaces_Level_0',
          // 'layout': {
          //   'visibility': 'none',
          // },
          'paint': defaults.rooms
        });

        map.addLayer({
          'id': 'level0_labels',
          'type': 'symbol',
          'source': 'level0',
          'source-layer': 'Spaces_Level_0',
          'layout': {
        	  'text-field': '{name}',
            'text-size': 12,
            // 'visibility': 'none'
          },
          'paint': {
            'text-color': 'black',
          }
        });

        // level 1
        map.addLayer({
          'id': 'level1_poly',
          'type': 'fill-extrusion',
          'source': 'level1',
          'source-layer': 'Spaces_Level_1',
          // 'layout': {
          //   'visibility': 'none',
          // },
          'paint': defaults.rooms
        });

        map.addLayer({
          'id': 'level1_labels',
          'type': 'symbol',
          'source': 'level1',
          'source-layer': 'Spaces_Level_1',
          'layout': {
        	  'text-field': '{name}',
            'text-size': 12,
            // 'visibility': 'none'
          },
          'paint': {
            'text-color': 'black',
          }
        });

        // level 2
        map.addLayer({
          'id': 'level2_poly',
          'type': 'fill-extrusion',
          'source': 'level2',
          'source-layer': 'Spaces_Level_2',
          'layout': {
            'visibility': 'none',
          },
          'paint': defaults.rooms
        });

        map.addLayer({
          'id': 'level2_labels',
          'type': 'symbol',
          'source': 'level2',
          'source-layer': 'Spaces_Level_2',
          'layout': {
        	  'text-field': '{name}',
            'text-size': 12,
            'visibility': 'none'
          },
          'paint': {
            'text-color': 'black',
          }
        });

        // level 3
        map.addLayer({
          'id': 'level3_poly',
          'type': 'fill-extrusion',
          'source': 'level3',
          'source-layer': 'Spaces_Level_3',
          'layout': {
            'visibility': 'none',
          },
          'paint': defaults.rooms
        });

        map.addLayer({
          'id': 'level3_labels',
          'type': 'symbol',
          'source': 'level3',
          'source-layer': 'Spaces_Level_3',
          'layout': {
        	  'text-field': '{name}',
            'text-size': 12,
            'visibility': 'none'
          },
          'paint': {
            'text-color': 'black',
          }
        });

        //map.setFilter('space2', ['==', 'type', "room"]);
        //document.createElement('<svg><rect width=100 height=100 x=0 y=0/></svg>')
        var youAreHere = new mapboxgl.Marker()
          .setLngLat([ -81.03725, 34.0044569])
          .addTo(map);
      });

      map.on('touchend', function(e){
        console.log('reset the map')
        clearTimeout(resetTimer);
        resetTimer = setTimeout(()=>{
          map.easeTo({
              duration:30000,
              zoom: defaults.zoom,
              center: [ -81.037352, 34.004132],
              bearing: defaults.bearing,
              pitch: 25
          })
        },10000)
      });
    },
    methods: {
      getLevel(levelNumber) {
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
    left:5vw;
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
  $room:rgb(194, 202, 186);
  $room_focus: rgb(47, 140, 216);

</style>
