import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import First from "../views/First.vue";
import Login from "../views/Login.vue";
import Inicio from "../views/Inicio.vue";
import Prueba1 from "../views/prueba1";
import Prueba2 from "../views/prueba2";

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
  {
    path: "/prueba1",
    name: "prueba1",
    component: Prueba1,
    meta: {
      haveUser: true,
    },
  },
  {
    path: "/prueba2",
    name: "prueba2",
    component: Prueba2,
    meta: {
      haveUser: true,
    },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path == "/") next("/login");
  if (to.meta.haveUser) {
    let temp = await store.getters.getUser;
    if (temp.email) {
      if (to.path == "/inicio") next();
      else if (to.path=="/prueba1" || to.path=="/prueba2") next();
      else next("/inicio");
    }
  }
  if (to.path == "/login") {
    let temp = store.getters.getUser;
    if (temp.email) next("/inicio");
    else next();
  }
});

export default router;
