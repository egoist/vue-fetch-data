import Vue from 'vue'
import FetchData from '../src'
import App from './App.vue'

Vue.use(FetchData)

new Vue({
  el: '#app',
  render: h => h(App)
})
