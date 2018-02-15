<template>
  <div>
  <div id="map" style='width: 100%; height: 50vh;'></div>
  <!-- <nav>
    <a>3</a>
    <a>2</a>
    <a>1</a>
    <a>G</a>
  </nav> -->
  </div>
</template>

<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA';
  var map;

  export default {
    name: 'map-module',
    mounted: function() {

      map = new mapboxgl.Map({
          container: this.$el.querySelector('#map'),
          style: 'mapbox://styles/richlandlibrary/cj49uxv2d2z4u2sl4k0l5q9yx',
          zoom:18.5,
          center: [ -81.037352, 34.004132],
          bearing: -109,
          pitch:25
      });

      map.on('load', function () {
        map.addLayer({
          'id': 'space0',
          'type': 'fill-extrusion',
          'source': {
            type: 'vector',
            url: 'mapbox://richlandlibrary.cjdm6sv830an52zs3mjvauu3f-6y4rr'
          },
          'source-layer': 'Space_Level_0',
            'layout': {
                'visibility': 'visible',
                // 'line-join': 'round',
                // 'line-cap': 'round'
            },
            'paint': {
                'fill-extrusion-color': '#877b59',
                // 'line-color': '#cbcbcb',
                // 'line-width': 1
            }
        });
      });

      // var toggleableLayerIds = [ 'contours', 'museums' ];

      // for (var i = 0; i < toggleableLayerIds.length; i++) {
      //     var id = toggleableLayerIds[i];

      //     var link = document.createElement('a');
      //     link.href = '#';
      //     link.className = 'active';
      //     link.textContent = id;

      //     link.onclick = function (e) {
      //         var clickedLayer = this.textContent;
      //         e.preventDefault();
      //         e.stopPropagation();

      //         var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      //         if (visibility === 'visible') {
      //             map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      //             this.className = '';
      //         } else {
      //             this.className = 'active';
      //             map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      //         }
      //     };

      //     var layers = document.getElementById('menu');
      //     layers.appendChild(link);
      // }
    }
  }
</script>

