import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import utils from '@/static/utils/utils.js'
Vue.prototype.utils = utils //全局挂在自定义方法
import api from '@/common/api.js'

import uView from "uview-ui";
Vue.use(uView);
import hxNavbar from "./components/hx-navbar/hx-navbar"
Vue.config.productionTip = false
Vue.prototype.api = api //全局挂在自定义方法
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif