import Vue from 'vue'
import App from './App'

import store from './store'

import uniIcon from './components/uni-icon.vue'

import pageHead from './components/page-head.vue'
Vue.component('page-head',pageHead)

Vue.component('uni-icon',uniIcon)

Vue.config.productionTip = false

import ajaxa from './common/request.js' 
import util from './common/util.js' 
Vue.prototype.$util = util
Vue.prototype.$ajaxa = ajaxa


Vue.prototype.$store = store;
Vue.prototype.base_url = 'http://demo.hanyuan369.com/index.php/';


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()