import Vue from 'vue'
import Vuex from 'vuex'
import getList from '../api/evanced'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    floorStanding: 1,
    floorViewing: 1,
    zoom: 18.3,
    // zoom: 19.3,
    bearing: -70,
    center: {lng: -81.03730200444548, lat: 34.00414146587417},
    room_id: '',
    event_id: undefined,
    defaultMode: true,
    time: new Date(),
    events: [
      {
        title: "Example Event",
        time: "3:32",
        endtime: "6:41",
        iso_start: new Date(),
        iso_end: new Date('02-20-2019'),
        location: "Main",
        floor: 3,
        room_id: "1234"
      }
    ],
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
    },
    eventUpdater(state) {
      getList(1).then((result) => {
        state.events = result
      })
    },
  },
  actions: {
    used() {
      resetState()
    }
  }
})

export default store;

// the defaults are stored in a constant variable, not accessible to other parts of the app
// Vuex will restore defaults to state parameters on its own
// (components computing variables from state will update automatically as the state reverts)
// it could be connected to something like firebase later on as to not immediately interrupt state
// but update when there's nothing else going on

const defaultState = JSON.parse(JSON.stringify(store.state))
delete defaultState.time;
delete defaultState.events;

var debouncer;
function resetState() {
  store.commit('set', {defaultMode:false})
  clearTimeout(debouncer)
  debouncer = setTimeout(function(){
    let s = defaultState
    s.defaultMode = true;
    store.commit('set', s)
    //console.log(store)
  },10000)
}

// timers
let ticktock = setInterval(function() { store.commit('clock') }, 1*60*1000)
let eventPlanner = setInterval(function() { store.commit('eventUpdater') }, 5*60*1000)
store.commit('eventUpdater')