<template>
  <div class="h-auto min-h-screen inicio">
    <div
      class="h-12 sm:h-12 md:h-14 w-screen bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <img
      class="ml-12 mt-4 h-12 object-contain xl:h-14 w-full object-left"
      src="../assets/images/logo-uah.png"
      alt="Logo UAH"
    />
    <div class="w-full container mt-10">
      <TarjetaPerfil
        :nombreUsuario="this.nombreUsuario"
        :rolUsuario="this.tipoUsuario"
      ></TarjetaPerfil>
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8 justify-center align-middle"
      >
        <div v-for="(action, index) in this.getAcciones" :key="action.title">
          <div class="col-span-3 sm:col-span-4 md:col-span-1">
            <TarjetaInicio
              :title="action.title"
              :route="action.route"
              :index="index"
            ></TarjetaInicio>
          </div>
        </div>
      </div>
    </div>
    <div class="inset-x-0 bottom-0 mt-10">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-10 rounded"
        @click="Reset"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script>
import TarjetaInicio from "../components/tarjetaInicio";
import TarjetaPerfil from "../components/tarjetaPerfil";
export default {
  name: "Inicio",
  components: {
    TarjetaInicio,
    TarjetaPerfil,
  },
  data() {
    return {
      accionesAdmin: [
        { title: "Reservar aulas", route: "/reservation" },
        { title: "Asignación de asignaturas", route: "/asignaturas" },
        { title: "Gestionar reservas pendientes", route: "/pendingReservations" },
        { title: "Gestión de profesores", route: "/profesores" },
        { title: "Gestión de estudiantes", route: "/estudiantes" },
      ],
      accionesNormal: [
        { title: "Reservar aulas", route: "/reservation" },
        { title: "Ver calendario", route: "/calendario" },
      ],
      acciones: [],
      tipoUsuario:
        this.$store.getters.getUser.role == 2
          ? "Administrador"
          : this.$store.getters.getUser.role == 1
          ? "Profesor"
          : "Estudiante",
      nombreUsuario: this.$store.getters.getUser.email,
    };
  },
  computed: {
    getAcciones: function () {
      return this.tipoUsuario == "Administrador"
        ? this.accionesAdmin
        : this.accionesNormal;
    },
  },
  methods: {
    async Reset() {
      this.$swal({
        title: "Cerrar sesión",
        text: "¿Estás seguro que quieres cerrar la sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar sesión",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store
            .dispatch("reset", {})
            .then(() => this.$router.push("/login"));
        }
      });
    },
  },
};
</script>

<style scoped>
.inicio {
  overflow: hidden;
}

button {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

button:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.card {
  background-color: #fff;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
