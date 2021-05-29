import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import $ from "jquery";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import './assets/app.scss';
import './assets/admin.scss';
import {fb} from "./firebase";
import VueFirestore from 'vue-firestore';

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.use(VueFirestore);

Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(function(user) {
  if(!app){
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");    
  }
});