<template>
  <div class="map-module">
    <div id="map" style='width: 100%; height: 100%;'></div>
    <nav>
      <div @touchstart="setLevel(3)" :class="{'viewing': floorViewing === 3, 'you-are-here': floorStanding === 3}">3</div>
      <div @touchstart="setLevel(2)" :class="{'viewing': floorViewing === 2, 'you-are-here': floorStanding === 2}">2</div>
      <div @touchstart="setLevel(1)" :class="{'viewing': floorViewing === 1, 'you-are-here': floorStanding === 1}">1</div>
      <div @touchstart="setLevel(0)" :class="{'viewing': floorViewing === 0, 'you-are-here': floorStanding === 0}">G</div>
    </nav>
    <div class="overlay">Richland Library Main / Level {{floorStanding}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA'
  var map;

  export default {
    name: 'map-module',
    computed: mapState ({
      // defaultFloor: state => state.defaults.floor,
      floorStanding: 'floorStanding',
      floorViewing: 'floorViewing',
      zoom: 'zoom',
      bearing: 'bearing',
      center: 'center'
    }),
    watch: {
      floorViewing: function(){
        this.renderFloor()
      },
      cameraChange: function(){
        if(state.cameraChange){
          this.$store.commit('set',{ cameraChange: false })
          console.log('caught camera');
          map.flyTo({
            duration:30000,
            zoom: this.zoom,
            center: this.center,
            bearing: this.bearing,
            pitch: 25
          })
        }
      }
    },
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

      var mkr = document.createElement('div');
      mkr.className = 'marker you-are-here'
      var youAreHere = new mapboxgl.Marker(mkr)
        .setLngLat([-81.03723837967836, 34.00443466613849])
        .addTo(map);
      });

      map.on('touchend', () => {
        this.$store.dispatch('used')
      });

      map.on('click', function(e){
        console.log(e);
      })
    },
    methods: {
      setLevel: function(levelNumber) {
        this.$store.commit('userSet',{ floorViewing: levelNumber })
      },
      renderFloor: function() {

        // console.log('set the level filter to',levelNumber)
        map.setFilter('areas',
        [
          'all',
          ['==',`level_${this.floorViewing}`,1],
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
          ['==',`level_${this.floorViewing}`,1],
          [
            'any',
            ['==','type','wall'],
            ['==','staff',1]
          ]
        ]);

        map.setFilter('windows',
        [
          'all',
          ['==',`level_${this.floorViewing}`,1],
          ['==','type','window'],
        ]);

        map.setFilter('labels',
        [
          'all',
          ['==',`level_${this.floorViewing}`,1],
          ['!=','staff',1]
        ]);
      }
    }
  }
</script>

<style lang="scss">
  $you: rgb(189, 15, 73);
  $viewing: rgb(171, 240, 81);

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
      background-color: $viewing;
    }
    .you-are-here{
      background-color: $you;
      font-weight: 800;
      color: white;
    }

    .marker{
      background-image: url('/static/img/you.svg');
      background-size:cover;
      width:2rem;
      height:2rem;
      border-radius: 50%;
      cursor: pointer;
    }

    .overlay{
      position:absolute;
      bottom:0;
      background-color: $you;
      z-index:2000;
      width:96vw;
      font-size:2rem;
      color:white;
      padding:0.5em 2vw;
      font-weight:800;
    }
  }

  $room:rgb(194, 202, 186);
  $room_focus: rgb(47, 140, 216);
</style>
