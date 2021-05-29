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
import Swal from 'sweetalert2';

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;

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