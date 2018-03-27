import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  floor: 1,
  zoom: 18.3,
  bearing: -70,
  center: {lng: -81.03735096824548, lat: 34.004175572139815},
  room_id: -1
}

state.defaults = new Object(state)

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

// TODO: add a reset timer