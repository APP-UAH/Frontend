import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import First from "../views/First.vue";
import Login from "../views/Login.vue";
import Inicio from "../views/Inicio.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "first",
    component: First,
    meta: {
      haveUser: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      haveUser: false,
    },
  },
  {
    path: "/inicio",
    name: "inicio",
    component: Inicio,
    meta: {
      haveUser: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == "/") next("/login");
  if (to.meta.haveUser) {
    let temp = store.getters.getUser;
    if (temp.user) {
      if (to.path == "/inicio") next();
      else next("/inicio");
    }
  }
  if (to.path == "/login") {
    let temp = store.getters.getUser;
    if (temp.user) next("/inicio");
    else next();
  }
});

export default router;
