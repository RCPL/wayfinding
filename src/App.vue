<template>
	<div>
		<h1>An update for this screen is in progress.</h1>
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

<style>
	*{
		font-family:inherit;
	}
	@font-face {
			font-family: "Avenir Next Variable";
			src: url("../static/font/AvenirNext_Variable.ttf") format("truetype");
	}
	
	#app {
		font-family: 'Avenir Next Variable', Helvetica, Arial, sans-serif;
		color: rgb(0, 0, 0);
    font-size: 148px;
    font-variation-settings: 'wght' 631.164, 'wdth' 88.6799;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>