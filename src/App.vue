<template>
	<div style="padding:70px">
		<img src="../static/img/logo-md.svg">
		<h1>An update for this screen is in progress.</h1>
		<hr>
		<h2>Events Today on the 3rd floor</h2>
		<p>2:30pm<br>
			<strong>Basic Résumé Help with Career Coaches for adults</strong></p>
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
	
	#app {
		
	}
</style>