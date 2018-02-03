// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//  import VueCarbon from 'vue-carbon'
import axios from 'axios'
//  import 'vue-carbon/dist/vue-carbon.css'
import store from './store/index'
import './assets/css/iconfont.styl'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('./common/image/error.png'),
  loading: require('./common/image/loading.gif')
})
//  Vue.use(VueCarbon)
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
