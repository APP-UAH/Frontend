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
    <p @click="Reset" style="cursor: pointer">Reset</p>
    <div class="w-full container">
      <div
        v-if="this.tipoUsuario == 'administracion'"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8 justify-center align-middle"
      >
        <div v-for="action in accionesAdmin" :key="action">
          <div class="col-span-3 sm:col-span-4 md:col-span-1">
            <TarjetaInicio
              :title="action.title"
              :route="action.route"
            ></TarjetaInicio>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="titulos in acciones" :key="titulos">
          <TarjetaInicio :title="titulos"></TarjetaInicio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TarjetaInicio from "../components/tarjetaInicio";
export default {
  name: "Inicio",
  components: {
    TarjetaInicio,
  },
  data() {
    return {
      accionesAdmin: [
        { title: "Reservar aulas", route: "/prueba1" },
        { title: "Ver informes", route: "/prueba2" },
        { title: "Aceptar reservas", route: "" },
      ],
      acciones: ["Reservar aulas", "Ver calendario"],
      tipoUsuario: this.$store.getters.getUser.role,
    };
  },
  methods: {
    async Reset() {
      await this.$store
        .dispatch("reset", {})
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style scoped>

.inicio{
  overflow: hidden;
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
