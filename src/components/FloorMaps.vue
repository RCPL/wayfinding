<template>
  <section>
    <!-- <nav>
      <a>3</a>
      <a>2</a>
      <a>1</a>
      <a>G</a>
    </nav> -->
    <div id="scrollable">
      <img src="/static/img/floor-3.png">
    </div>
  </section>
</template>

<script type="text/babel">
  export default {
    name: 'FloorMaps'
  }
</script>

<style lang="scss" scoped>
  section {
    min-height:620px;
    display:flex;
    flex-direction: row;
    overflow-y: scroll;
  }
  img {
    width: 100%;
  }
  nav{
    display:flex;
    flex-direction:column;
    font-size: 200%;
    font-weight:800;
    text-align: center;
    padding:50px;
  }
  #scrollable{
    flex:1;
  }
</style>
