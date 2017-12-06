// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/sass/app.scss'
import VueResource from 'vue-resource'
import alert from './Venus/components/alertInfo'
import msg from './Venus/components/message'
import picker from './Venus/components/picker'

Vue.use(VueResource)

Vue.config.productionTip = false;
 Vue.prototype.$myMounted=function(name,obj){
  let message = new name({data:obj});
  message.$mount(document.createElement('div'))  
  message.$parent = this
  this.$el.appendChild(message.$el)
}
Vue.prototype.$message = function(obj){
  this.$myMounted(Vue.extend(msg),obj)
}

Vue.prototype.$alert = function(obj){
  this.$myMounted(Vue.extend(alert),obj)
}
Vue.prototype.$picker = function(obj){
  this.$myMounted(Vue.extend(picker),obj)  
  
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
