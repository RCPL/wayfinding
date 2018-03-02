<template>
  <div class="map-module">
    <div id="map" style='width: 100%; height: 100%;'></div>
    <nav>
      <a>3</a>
      <a>2</a>
      <a class="your_level">1</a>
      <a>G</a>
    </nav>
  </div>
</template>

<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA';
  var map;
  var resetTimer;

  var defaults = {
    zoom: 18,
    bearing: -120
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
          url: 'mapbox://richlandlibrary.cjdm6sv830an52zs3mjvauu3f-6y4rr'
        });

        map.addLayer({
          'id': 'level polygons',
          'type': 'fill-extrusion',
          'source': 'level1',
          'source-layer': 'Spaces_Level_1',
            // 'layout': {
            //     'visibility': 'visible',
            // },
          'paint': {
            'fill-extrusion-color': '#bada55',
            'fill-extrusion-height': 1,
            'fill-extrusion-base': 0
          }
        });

        map.addLayer({
          'id': 'level labels',
          'type': 'symbol',
          'source': 'level1',
          'source-layer': 'Spaces_Level_1',
          'layout': {
        	  'text-field': '{name}',
            'text-size': 12
          },
          'paint': {
            'text-color': 'black',
            
          }
        });
        //map.setFilter('space2', ['==', 'type', "room"]);
        //document.createElement('<svg><rect width=100 height=100 x=0 y=0/></svg>')
        var youAreHere = new mapboxgl.Marker()
          .setLngLat([ -81.037352, 34.004232])
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
  nav a{
    padding:0.5em;
  }
  .your_level{
    background-color: red;
    font-weight: 800;
    color: white;
  }
</style>
