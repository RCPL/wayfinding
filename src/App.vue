<template>
	<main>
		
		
		<!-- <FloorMaps/> -->
		<Map/>
		<Clock/>
		<!-- <img src="../static/img/logo-md.svg"> -->
		<EventList style="padding:70px; flex:1"/>
		
		<UnderConstruction/>
	</main>
</template>

<script>
  import FloorMaps from './components/FloorMaps'
  // import Spaces from './components/Spaces'
	import UnderConstruction from './components/UnderConstruction'
	import EventList from './components/EventList'
	import Clock from './components/Clock'
	import Map from './components/Map'

  export default {
		name: 'App',
    components: {
      FloorMaps,
			UnderConstruction,
			EventList,
			Clock,
			Map
      // Spaces
    }
  }

  setTimeout("location.reload(true);",15*60*1000); 
</script>

<style lang="scss">
	*{
		font-family:inherit;
		font-size:inherit;
		color:inherit;
	}

	@font-face {
		font-family: "Avenir Next Variable";
		src: url("../static/variable-fonts/AvenirNext/AvenirNext_Variable.ttf") format("truetype");
	}

	body{
		margin:0;
		font-family: "Avenir Next Variable", Helvetica, Arial, sans-serif;
		color: rgb(0, 0, 0);
		font-size:40px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	h1{
		font-size:200%;
		font-weight:600;
    font-variation-settings: 'wght' 631.164, 'wdth' 188.6799;
	}
	h2{
		font-size:150%;
		font-weight:600;
    font-variation-settings: 'wght' 631.164, 'wdth' 188.6799;
	}
	
	main{
		height:100vh;
		display:flex;
		flex-direction: column;
	}
</style>