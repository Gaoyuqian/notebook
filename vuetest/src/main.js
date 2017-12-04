// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/sass/app.scss'
import VueResource from 'vue-resource'
import alt from './Venus/components/alertInfo'
import msg from './Venus/components/message'
Vue.use(VueResource)


// Vue.prototype.$message = function(obj){
//   console.log(obj);  
// }
Vue.config.productionTip = false;
Vue.prototype.$message = function(obj){
  const info = Vue.extend(msg);  
  var message = new info({data:obj});
  message.$mount(document.createElement('div'))  
  message.$parent = this
  this.$el.appendChild(message.$el)
}

Vue.prototype.$alert = function(obj){
  console.log('this')
  const alert = Vue.extend(alt);  
  var message = new alert({data:obj});
  message.$mount(document.createElement('div'))  
  message.$parent = this
  this.$el.appendChild(message.$el)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
