// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import animate from 'vue2-animate/dist/vue2-animate.min.css'
//import './assets/css/mui.css'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.config.productionTip = false;
//设置cookie
Vue.prototype.setCookie = function(c_name,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +value+ ((expiredays==null) ? "" : ";expires="+exdate)
  alert(document.cookie)
};

//获取cookie
Vue.prototype.getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
};

//删除cookie
Vue.prototype.clearCookie = function(name) {
  Vue.prototype.setCookie(name, "", -1);
};
/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
//其余页面我引好了jquery，要改变vue配置，但index.html可以单独引入jquery吗，我引jquery后再打印$，结果是未定义。
