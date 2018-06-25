<template>
	<main>
		<!-- <UnderConstruction/> -->
		<Map style="height:50vh"/>
		<!-- <img src="../static/img/logo-md.svg"> -->
		<Clock/>
		<EventList style="flex:1"/>
		
	</main>
</template>

<script>
  // import Spaces from './components/Spaces'
	import UnderConstruction from './components/UnderConstruction'
	import EventList from './components/EventList'
	import Clock from './components/Clock'
	import Map from './components/Map'

  export default {
		name: 'App',
    components: {
			UnderConstruction,
			EventList,
			Clock,
			Map
      // Spaces
    }
  }

  setTimeout("location.reload(true);",20*60*1000); 
</script>

<style lang="scss">
	*{
		font-family:inherit;
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
		font-size: 3vmin;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	h1{
		font-size:4rem;
		font-weight:600;
    font-variation-settings: 'wght' 631.164, 'wdth' 188.6799;
	}
	h2{
		font-size:3rem;
		font-weight:600;
    font-variation-settings: 'wght' 631.164, 'wdth' 188.6799;
	}
	h3{
		font-size:2rem;
	}
	
	main{
		height:100vh;
		display:flex;
		flex-direction: column;
	}
</style>
