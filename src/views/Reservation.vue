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
              v-model="endDate"
              class="border w-8/12 mx-auto p-2"
              format="yyyy-MM-dd'T'HH:mm:ss"
            ></datetime>
          </div>
          <div>
            <button
              class="bg-blue-800 hover:bg-blue-900 text-white font-bold w-6/12 mt-4 py-2 px-4"
              @click="checkDate"
            >
              Buscar disponibilidad
            </button>
          </div>
        </div>
        <div v-else-if="this.checking && !this.checked">
          <p>Comprobando las reservas disponibles</p>
        </div>
        <div v-else-if="this.checked">
          <div v-if="this.rooms.length == 0">
            <p>No hay salas disponibles para esa franja horaria</p>
          </div>
          <div v-else>
            <p class="text-lg mb-6">Espacios disponibles para la reserva</p>
            <div class="flex flex-row flex-wrap">
              <div
                class="flex flex-col"
                v-for="(room, index) in this.rooms"
                :key="index"
              >
                <div class="mx-1 mb-6 p-3 border text-left">
                  <div class="flex flex-row">Sala: {{ room.name }}</div>
                  <div class="flex flex-row">
                    Capacidad: {{ room.capacity }}
                  </div>
                  <div>
                    <input
                      type="radio"
                      :id="index"
                      :value="index"
                      v-model="indexRoom"
                    />
                    <label class="ml-2" :for="index">Seleccionar sala</label>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="this.userType == 1"
              class="flex flex-row align-middle justify-evenly"
            >
              <div class="flex flex-row mr-6">
                <input
                  type="radio"
                  id="asignatura"
                  value="subject"
                  v-model="reservationType"
                />
                <label class="ml-2" for="asignatura">Asignatura</label>
              </div>
              <div
                class="flex flex-row align-middle justify-center justify-items-center"
              >
                <input
                  type="radio"
                  id="evento"
                  value="events"
                  v-model="reservationType"
                />
                <label class="ml-2" for="evento">Evento</label>
              </div>
            </div>
            <div v-if="this.reservationType == 'subject'">
              <div
                class="flex flex-col"
                v-for="(subject, index) in this.subjects"
                :key="index"
              >
                <div class="mx-1 mb-6 p-3 border text-left">
                  <div>
                    <input
                      type="radio"
                      :id="index"
                      :value="index"
                      v-model="selectedSubjects"
                    />
                    <label class="ml-2" :for="index">{{ subject.name }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                class="bg-blue-800 hover:bg-blue-900 text-white font-bold w-6/12 mt-4 py-2 px-4"
                @click="reserve"
              >
                Reservar
              </button>
            </div>
          </div>
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
      rooms: [],
      checked: false,
      indexRoom: -1,
      reservationType: "",
      selectedSubjects: -1,
      subjects: [],
    };
  },

  methods: {
    async checkDate() {
      this.checking = true;
      this.dateSelected = true;
      if (new Date(this.date) >= new Date(this.endDate)) {
        this.checking = false;
      } else {
        let url =
          this.userType == 1
            ? "http://localhost:8080/AppUah/Classrooms"
            : "http://localhost:8080/AppUah/Libraryrooms";
        try {
          let temp1 = this.date.split(".000")[0];
          let temp2 = this.endDate.split(".000")[0];
          let data = { begin: temp1, end: temp2 };

          this.rooms = await axios.post(url, data).then((res) => res.data);
          this.checked = true;
        } catch (e) {
          console.log(e);
          this.checking = false;
          this.checked = false;
        }
      }
    },

    async reserve() {
      if (this.indexRoom == -1) {
        alert("No se ha seleccionado ninguna sala");
      } else if (this.indexRoom >= this.rooms.length) {
        alert("La sala seleccionada no es correcta");
      } else if (
        this.reservationType == "subject" &&
        this.selectedSubjects == -1
      ) {
        alert("Es necesario seleccionar asignatura para este tipo de reservas");
      } else if (this.reservationType == "") {
        alert("Es necesario seleccionar el tipo de reserva");
      } else {
        let username = this.$store.getters.getUser.email;
        let data = {
          begin: this.date.split(".000")[0],
          end: this.endDate.split(".000")[0],
          room_name: this.rooms[this.indexRoom].name,
          username: username,
          type: this.reservationType,
        };
        if (this.reservationType == "subject") {
          data['id_Subject'] = this.subjects[this.selectedSubjects].id;
          data['plan_Subject'] = this.subjects[this.selectedSubjects].plan
        }
        await axios
          .post("http://localhost:8080/AppUah/reservations/create", data)
          .then((res) => console.log(res));
      }
    },
  },

  async beforeMount() {
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

    if (this.userType == 1) {
      let data = {
        username: this.$store.getters.getUser.email,
        type: this.userType,
      };
      let temp = await axios
        .post("http://localhost:8080/AppUah/subjects", data)
        .then((res) => res.data);
      for (let plan in temp) {
        temp[plan].forEach((el) => {
          let temp1 = el.split(",");
          this.subjects.push({ name: temp1[0], plan: temp1[1], id: temp1[2] });
        });
      }
    }
  },
  watch: {
    date() {
      this.endDate = this.date;
    },
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
