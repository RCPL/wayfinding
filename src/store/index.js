import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var debouncer;

const store = new Vuex.Store({
  state: {
    floorStanding: 1,
    floorViewing: 1,
    zoom: 18.3,
    bearing: -70,
    center: {lng: -81.03735096824548, lat: 34.004175572139815},
    room_id: undefined,
    event_id: undefined,
    resetCamera: false
  },
  mutations: {
    set(state,payload) {
      for(var key in payload){
        state[key] = payload[key]
      }
    },
    userSet(state,payload){
      console.log('userSet')
      this.commit('set',payload)
      resetState()
    }
  },
  actions: {
    used() {
      resetState()
    }
  }
})

export default store;

// the defaults, stored within the current state, (and eventually local storage or firebase or etc)
const defaultState = JSON.parse(JSON.stringify(store.state))


function resetState() {
  console.log('...')
  clearTimeout(debouncer);
  debouncer = setTimeout(function(){
    console.log('!!!')
    let s = defaultState
    s.resetCamera = true;
    store.commit('set', s)
    //console.log(store)
  },15000)
}