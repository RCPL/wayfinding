<template>
	<div>
		<h1 style="padding:100px">An update for this screen is in progress.</h1>
    <Spaces />
	</div>
</template>

<script type="text/babel">
  // import FloorMaps from './components/FloorMaps'
  import Spaces from './components/Spaces'

  export default {
    componenets: {
      // FloorMaps,
      Spaces
    }
  }

  setTimeout("location.reload(true);",120000);
</script>

<style lang="scss">
	// *{
	// 	font-family:inherit;
	// }
	@font-face {
			font-family: "Avenir Next Variable";
			src: url("../static/variable-fonts/AvenirNext/AvenirNext_Variable.ttf") format("truetype");
	}

	body{

		font-family: "Avenir Next Variable";//, Helvetica, Arial, sans-serif;
		color: rgb(0, 0, 0);
    font-size: 48px;
    font-variation-settings: 'wght' 631.164, 'wdth' 188.6799;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	#app {
		
	}
</style>