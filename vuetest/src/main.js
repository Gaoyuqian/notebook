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


// Vue.prototype.$message = function(obj){
//   console.log(obj);  
// }
Vue.config.productionTip = false;
function myMounted(name,obj,_this){
  let message = new name({data:obj});
  message.$mount(document.createElement('div'))  
  message.$parent = _this
  _this.$el.appendChild(message.$el)
}
Vue.prototype.$message = function(obj){
  myMounted(Vue.extend(msg),obj,this)
}

Vue.prototype.$alert = function(obj){
  myMounted(Vue.extend(alert),obj,this)  
}
Vue.prototype.$picker = function(obj){
  myMounted(Vue.extend(picker),obj,this)  
  
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
