<template>
	<div>
		<h1>{{test}}</h1>
		<!--<UnderConstruction/>-->
	  <Map/>
		<Clock/>
	  <EventList style="flex:1"/>
	</div>
</template>

<script>

  // import FloorMaps from './components/FloorMaps'
  // import Spaces from './components/Spaces'
	// import UnderConstruction from './components/UnderConstruction'
	import EventList from './components/EventList'
	import Clock from './components/Clock'
	import Map from './components/Map'

  export default {
		name: 'App',
    components: {
    //   FloorMaps,
		// 	UnderConstruction,
		EventList,
		Clock,
		Map,
    //   // Spaces
		},
		data() {
			return {test: 'Event List test'}
		}
  }

	// setTimeout("location.reload(true);",20*60*1000); 
	
</script>

<style lang="scss">
</style>