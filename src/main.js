import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style/tailwind.css";
import "@/assets/style/material-icon.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import i18n from "./i18n";
import "./registerServiceWorker";

Vue.use(VueToast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
