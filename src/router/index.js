import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import First from "../views/First.vue";
import Login from "../views/Login.vue";
import Inicio from "../views/Inicio.vue";
import Calendar from "../views/Calendar.vue";
import Prueba2 from "../views/prueba2";
import Profesores from "../views/Profesores.vue";
import Estudiantes from "../views/Estudiantes.vue";
import Asignaturas from "../views/Asignaturas.vue";
import Reservation from "../views/Reservation.vue"
import PendingReservations from "../views/PendingReservations.vue";

Vue.use(VueRouter);

const routes = [{
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
        path: "/calendario",
        name: "calendario",
        component: Calendar,
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
    },
    {
        path: "/profesores",
        name: "profesores",
        component: Profesores,
        meta: {
            haveUser: true,
        },
    },
    {
        path: "/estudiantes",
        name: "estudiantes",
        component: Estudiantes,
        meta: {
            haveUser: true,
        },
    },
    {
        path: "/asignaturas",
        name: "asignaturas",
        component: Asignaturas,
        meta: {
            haveUser: true,
        },
    },
    {
        path: "/pendingReservations",
        name: "PendingReservations",
        component: PendingReservations,
        meta: {
            haveUser: true,
        },
    },
    {
        path: "/reservation",
        name: "Reservation",
        component: Reservation,
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

router.beforeEach(async(to, from, next) => {
    if (to.path == "/") next("/login");
    if (to.meta.haveUser) {
        let temp = await store.getters.getUser;
        if (temp.email) {
            if (to.path == "/inicio") next();
            else if (
                to.path == "/calendario" ||
                to.path == "/prueba2" ||
                to.path == "/profesores" ||
                to.path == "/estudiantes" ||
                to.path == "/pendingReservations" ||
                to.path == "/reservation" ||
                to.path == "/asignaturas"
            )
                next();
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