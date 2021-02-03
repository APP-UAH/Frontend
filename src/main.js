import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style/tailwind.css";
import "@/assets/style/material-icon.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import i18n from "./i18n";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import PortalVue from "portal-vue";

Vue.use(PortalVue);

Vue.use(VueSweetalert2);
Vue.use(VueToast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
