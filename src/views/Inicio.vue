<template>
  <div>
    <p>Inicio</p>
    <p @click="Reset" style="cursor: pointer">Reset</p>
    <div class="grid grid-rows-3 grid-flow-col gap-4 w-full container">
      <div v-if="this.tipoUsuario == 'administracion'" >
        <div v-for="action in accionesAdmin" :key=action >
            <TarjetaInicio :title="action.title" :route="action.route"></TarjetaInicio>
        </div>
      </div>
      <div v-else>
        <div v-for="titulos in acciones" :key=titulos>
            <TarjetaInicio :title="titulos"></TarjetaInicio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TarjetaInicio from "../components/tarjetaInicio"
export default {
  name: "Inicio",
  components: {
    TarjetaInicio
  },
  data(){
    return { accionesAdmin: [{title:"Reservar aulas", route:"/prueba1" },{title:"Ver informes", route:"/prueba2"},{title:"Aceptar reservas", route:""}],
              acciones:["Reservar aulas", "Ver calendario"],
              tipoUsuario: this.$store.getters.getUser.role}
  },
  methods: {
    async Reset() {
      await this.$store.dispatch("reset", {});
    },
  },
};
</script>


<style scoped>
.card {
  background-color: #fff;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>