<template>
  <section>
    <time>{{currentTime}}</time>
  </section>
</template>

<script>
  import moment from 'moment'
  export default {
    name:'Clock',
    computed: {
      currentTime: () => {
        return moment().format('h:mma dddd MMMM DD ');
      }
    }
  }
</script>

<style lang="scss" scoped>
  section{
    background-color: rgb(12, 125, 160);
    padding:0.75em;
    color:white;
    font-weight:600;
  }
</style>
