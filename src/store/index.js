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
    center: {lng: -81.03730200444548, lat: 34.00414146587417},
    room_id: undefined,
    event_id: undefined,
    defaultMode: true,
    time: new Date()
  },
  mutations: {
    set(state,payload) {
      for(var key in payload){
        state[key] = payload[key]
      }
    },
    userSet(state,payload){
      this.commit('set',payload)
      resetState()
    },
    clock(state) {
      state.time = new Date();
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
delete defaultState.time;

function resetState() {
  store.commit('set', {defaultMode:false})
  clearTimeout(debouncer);
  debouncer = setTimeout(function(){
    let s = defaultState
    s.defaultMode = true;
    store.commit('set', s)
    //console.log(store)
  },10000)
}

let ticktock = setInterval(function() { store.commit('clock') }, 60000);