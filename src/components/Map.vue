<template>
  <div id="map" style='width: 100%; height: 700px;'></div>
</template>

<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGxhbmRsaWJyYXJ5IiwiYSI6ImNpZnh5cDZ1NTRwbGN1dW0wcmhjMWZ3MHYifQ.gqkQbN_FAgHPRVsL6Vi-lA';
  var map;

  export default {
    name: 'map-module',
    mounted: function() {
      map = new mapboxgl.Map({
          container: this.$el,
          style: 'mapbox://styles/richlandlibrary/cixukit86002t2rrs3mt5vfij'
      });
    }
  }
</script>

