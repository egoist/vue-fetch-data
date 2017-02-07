import Vue from 'vue'
import store from './store'
import FetchData from '../src'
import App from './App.vue'

Vue.use(FetchData)

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
