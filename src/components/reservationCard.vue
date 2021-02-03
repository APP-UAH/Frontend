<template>
  <div class="mx-4 md:mx-0">
    <div class="w-full rounded card">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">
          Reserva del aula {{ room.name }}
        </div>
        <div class="text-lg mb-2">
          Inicio de la reserva {{ this.beginDate }}
        </div>
        <div class="text-lg mb-2">Fin de la reserva {{ this.endDate }}</div>
        <div class="font-thin mb-2">
          Capacidad del aula {{ room.capacity }} personas
        </div>
      </div>
      <div v-if="this.pending">
        <div class="flex flex-row w-full justify-evenly">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-10 rounded"
            @click="$router.go(-1)"
            :disabled="this.updating"
            :class="[this.updating ? 'cursor-wait' : '']"
          >
            Aceptar reserva</button
          ><button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-10 rounded"
            @click="$router.go(-1)"
            :disabled="this.updating"
            :class="[this.updating ? 'cursor-wait' : '']"
          >
            Denegar reserva
          </button>
        </div>
      </div>
      <div v-else class="pb-6">
        <p class="text-lg">
          Estado de la reserva:
          <span
            :class="[
              this.accepted
                ? 'font-bold text-green-500'
                : 'font-bold text-red-500',
            ]"
            >{{ this.accepted ? "Aceptada" : "Rechazada" }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TarjetaInicio",
  props: {
    begin: Object,
    end: Object,
    room: Object,
    state: Object,
  },
  data() {
    return {
      beginDate: "",
      endDate: "",
      updating: false,
      pending: true,
      accepted: false,
    };
  },
  beforeMount() {
    this.beginDate =
      (this.$props.begin.time.hour <= 9
        ? "0" + this.$props.begin.time.hour
        : this.$props.begin.time.hour) +
      ":" +
      (this.$props.begin.time.minute <= 9
        ? "0" + this.$props.begin.time.minute
        : this.$props.begin.time.minute) +
      " - " +
      (this.$props.begin.date.day <= 9
        ? "0" + this.$props.begin.date.day
        : this.$props.begin.date.day) +
      "/" +
      (this.$props.begin.date.month <= 9
        ? "0" + this.$props.begin.date.month
        : this.$props.begin.date.month) +
      "/" +
      this.$props.begin.date.year;

    this.endDate =
      (this.$props.end.time.hour + 1 <= 9
        ? "0" + this.$props.end.time.hour + 1
        : this.$props.end.time.hour + 1) +
      ":00 - " +
      (this.$props.end.date.day <= 9
        ? "0" + this.$props.end.date.day
        : this.$props.end.date.day) +
      "/" +
      (this.$props.end.date.month <= 9
        ? "0" + this.$props.end.date.month
        : this.$props.end.date.month) +
      "/" +
      this.$props.end.date.year;
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
