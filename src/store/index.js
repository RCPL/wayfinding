import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// the current state
var state = {
  floor: 1,
  zoom: 18.3,
  bearing: -70,
  center: {lng: -81.03735096824548, lat: 34.004175572139815},
  room_id: -1
}

// the defaults, stored within the current state, (and eventually local storage or firebase or etc)
state.defaults = JSON.parse(JSON.stringify(state))

export default new Vuex.Store({
  state: state,
  mutations: {
    select(state,payload){
      for(var key in payload){
        state[key] = payload[key]
      }
      // console.log('selection',state)
    }
  }
})

// TODO: add a reset timer ... use lodash debounce?