// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import filters from './filter/filters'
import api from './api'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(ElementUI);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
