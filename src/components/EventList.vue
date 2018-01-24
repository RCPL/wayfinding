<template>
  <div>
    <section v-for="event in events" :key="event.id">
      <h2>{{event.title}}</h2>
      <h3>2:30 til 4:00 pm</h3>
      <p>{{event.description}}</p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'EventList',
    data: () => {
      return {
        events: [
          {
            id: 'aku2e5s2n34f5oa3i6revoaiw',
            timeStart: new Date('January 24 2018, 14:30 edt'),
            timeEnd: new Date('January 24 2018, 16:00 edt'),
            space: 'Career Coaching Center',
            location_full: 'Richland Library Main',
            location_branch: 'Main',
            age_groups: 'Adults (18–55)',
            title: 'Basic Résumé Help',
            description: 'Career Coaches will be available to answer your résumé questions on a first-come, first-served basis.',
            tags: ['Job & Career']
          }
        ]
      }
    },
    computed: {
      timeStart_human: function() {
        // console.log(this.timeStart)
        //return new Date(this.timeStart).getHours();
        return "2:30 pm";

      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
