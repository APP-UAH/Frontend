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
    <div class="w-full container mt-10">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8 justify-center align-middle"
      >
        <div v-for="pending in this.pendingReservations" :key="pending.id">
          <div class="col-span-3 sm:col-span-4 md:col-span-1">
            <ReservationCard
              :id="pending.id"
              :begin="pending.begin"
              :end="pending.end"
              :room="pending.room"
              :state="pending.state"
            ></ReservationCard>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 bottom-0">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded"
        @click="$router.go(-1)"
      >
        Volver al menú
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ReservationCard from "../components/reservationCard";

export default {
  components: { ReservationCard },
  data() {
    return {
      pendingReservations: [],
    };
  },
  async beforeMount() {
    let temp = await axios
      .get("http://localhost:8080/AppUah/reservations/pending")
      .then((res) => res.data);
    this.pendingReservations = temp;
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
