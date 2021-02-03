<template>
  <div class="h-auto min-h-screen inicio">
    <div
      class="h-12 sm:h-12 md:h-14 w-screen max-w-screen-full bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <img
      class="ml-12 mt-4 h-12 object-contain xl:h-14 max-w-screen-full object-left"
      src="../assets/images/logo-uah.png"
      alt="Logo UAH"
    />
    <div class="flex items-center flex-col align-middle">
      <div
        class="z-20 flex flex-col justify-center align-middle self-center w-11/12 md:w-4/12 my-12 py-12 px-12 card border-gray-500 border rounded-md"
      >
        <p
          class="text-gray-900 mx-5 font-bold text-left pt-2 text-base sm:text-lg md:text-2xl lg:text-2xl mb-2"
        >
          {{ this.firstText }}
        </p>

        <div v-if="!this.checking">
          <p v-if="this.dateSelected" class="text-red-500 mb-6">
            La fecha de fin no puede ser anterior a la de inicio
          </p>
          <div class="flex flex-col mb-10">
            <p>Selecciona la fecha y hora de inicio de la reserva</p>
            <datetime
              type="datetime"
              v-model="date"
              class="border w-8/12 mx-auto p-2"
              format="yyyy-MM-dd'T'HH:mm:ss"
            ></datetime>
          </div>
          <div class="flex flex-col mb-10">
            <p>Selecciona la hora de fin de la reserva</p>
            <datetime
              type="time"
              v-model="date"
              class="border w-8/12 mx-auto p-2"
              format="yyyy-MM-dd'T'HH:mm:ss"
            ></datetime>
          </div>
        </div>
        <div v-else-if="this.checking">
          <p>Comprobando las reservas disponibles</p>
        </div>

        <div>
          <button
            class="bg-blue-800 hover:bg-blue-900 text-white font-bold w-6/12 mt-4 py-2 px-4"
          >
            Buscar disponibilidad
          </button>
        </div>
      </div>
      <div class="mt-10">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded"
          @click="$router.go(-1)"
        >
          Volver al menú
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "vue-datetime/dist/vue-datetime.css";
import { Datetime } from "vue-datetime";

export default {
  name: "Reservation",
  components: { Datetime },
  data() {
    return {
      userType: "",
      textUserType: "",
      firstText: "",
      dateSelected: false,
      checking: false,
      dateValid: true,
      date: "",
      endDate: "",
    };
  },

  methods: {
    async checkDate() {
      this.checking = true;
      this.dateSelected = true;
      if (date < this.endDate) {
        this.checking = false;
      } else {
        try {
          let temp = await axios
            .get("http://localhost:8080/AppUah/reservations/pending")
            .then((res) => res.data);
        } catch (e) {
          console.log(e);
        } finally {
          this.checking = false;
        }
      }
    },
  },

  beforeMount() {
    (this.userType = this.$store.getters.getUser.role),
      (this.textUserType =
        this.userType == 2
          ? "Administrador"
          : this.userType == 1
          ? "Profesor"
          : "Estudiante"),
      (this.firstText =
        this.userType == 2
          ? "Reserva de aulas o salas de biblioteca"
          : this.userType == 1
          ? "Reserva de aulas"
          : "Reserva de salas de biblioteca");
  },
};
</script>

<style scoped>
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
