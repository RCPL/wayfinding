import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

// the current state
var state = {
  floorStanding: 1,
  floorViewing: 1,
  zoom: 18.3,
  bearing: -70,
  center: {lng: -81.03735096824548, lat: 34.004175572139815},
  room_id: undefined,
  event_id: undefined,
  cameraChange: false
}

// the defaults, stored within the current state, (and eventually local storage or firebase or etc)
const defaults = JSON.parse(JSON.stringify(state))

export default new Vuex.Store({
  state: state,
  mutations: {
    set(state,payload) {
      for(var key in payload){
        state[key] = payload[key]
      }
    },
    userSet(state,payload){
      this.commit('set',payload)
      this.dispatch('used')
    }
  },
  actions: {
    used() {
      console.log('debunce',debounce)
      _.debounce(function() {
        console.log('i run?')
        this.$store.dispatch('setDefaults')
      }, 100)
    },
    setDefaults () {
      console.log('resetting')
      this.commit('set', state.defaults)
    }
  }
})