<template>
  <div>
    <div
      class="h-12 sm:h-12 md:h-14 w-screen max-w-screen-full bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <router-link to="/inicio">
      <img
        class="ml-12 mt-4 h-12 object-contain xl:h-14 max-w-screen-full object-left"
        src="../assets/images/logo-uah.png"
        alt="Logo UAH"
      />
    </router-link>
    <div class="max-w-full w-full px-10">
      <kalendar :configuration="calendar_settings" :events.sync="events">
        <!-- CREATED CARD SLOT -->
        <div
          slot="created-card"
          slot-scope="{ event_information }"
          class="details-card"
        >
          <p
            class="appointment-title text-xl"
            style="font-size: 1.125rem !important"
          >
            {{ event_information.data.title }}
          </p>
          <p
            class="text-lg appointment-class"
            style="font-size: 1.115rem !important"
          >
            {{ event_information.data.class }}
          </p>
          <span class="time text-lg"
            >{{ event_information.start_time.split("T")[1].split("+")[0] }} -
            {{ event_information.start_time.split("T")[1].split("+")[0] }}</span
          >
        </div>
      </kalendar>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const _existing_events = [
  {
    from: "2020-11-10T16:30",
    to: "2022-11-10T18:30",
    data: {
      title: "Clase de Patrones de Software",
      class: "NA5",
      planner: "Salvador Otón",
      subject: true,
    },
  },
];

let today = new Date();

function getCurrentDay() {
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today.toISOString();
}

// change the dates on _existing events to this week
const startDate = new Date(_existing_events[0].from).getUTCDate();

function makeNow(dateString) {
  const d = new Date(dateString);
  d.setYear(today.getUTCFullYear());
  d.setMonth(today.getUTCMonth());
  d.setDate(today.getUTCDate() + (d.getUTCDate() - startDate));
  return d.toISOString();
}
const existing_events = _existing_events.map((ev) => ({
  ...ev,
  from: makeNow(ev.from),
  to: makeNow(ev.to),
}));

import { Kalendar } from "kalendar-vue";

export default {
  created() {},
  components: {
    Kalendar,
  },
  data() {
    return {
      events: existing_events,
      calendar_settings: {
        style: "material_design",
        cell_height: 10,
        scrollToNow: true,
        current_day: new Date(),
        read_only: true,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_days: [5, 6],
        past_event_creation: true,
      },
      new_appointment: {},
    };
  },
  methods: {
    lessThanNine(data) {
      return parseInt(data) <= 9 ? "0" + data : data;
    },
  },
  async beforeMount() {
    let user = this.$store.getters.getUser.email;
    console.log(user);
    let tempFromServer = await axios
      .post("http://localhost:8080/AppUah/reservations/user", {
        username: user,
      })
      .then((res) => res.data);

    tempFromServer.forEach((el) => {
      let temp = {};
      temp["from"] =
        el.reserva.begin.date.year +
        "-" +
        this.lessThanNine(el.reserva.begin.date.month) +
        "-" +
        this.lessThanNine(el.reserva.begin.date.day) +
        "T" +
        this.lessThanNine(el.reserva.begin.time.hour) +
        ":" +
        this.lessThanNine(el.reserva.begin.time.minute);
      temp["to"] =
        el.reserva.end.date.year +
        "-" +
        this.lessThanNine(el.reserva.end.date.month) +
        "-" +
        this.lessThanNine(el.reserva.end.date.day) +
        "T" +
        this.lessThanNine(el.reserva.end.time.hour) +
        ":" +
        this.lessThanNine(el.reserva.end.time.minute);

      temp["data"] = {};
      temp.data.title =
        el.name_subject == "" || el.name_subject == null
          ? "Reserva biblioteca"
          : "Clase de " + el.name_subject;

      temp.data.class =
        el.name_subject == "" || el.name_subject == null
          ? "Sala " + el.reserva.room.name
          : "" + el.reserva.room.name;
      temp.data.subject = el.name == "" && el.name == null;
      this.$kalendar.addNewEvent(temp);
    });
  },
};
</script>
<style lang="scss">
$green: #00f0b5;
$red: #f61067;

.details-card {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;

  button {
    margin: 0;
    border: none;
    color: #4c4b4b;
    position: absolute;
    padding-right: 0px;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background: transparent;

    svg {
      width: 18px;
      height: 18px;
      fill: #fafafa;
    }
  }

  .remove {
    opacity: 0;
    transition: opacity 0.15s;
  }

  &:hover .remove {
    opacity: 1;
  }
}

.appointment-class  {
  font-size: 1.125rem !important;
}

.popup-event .buttons {
  display: flex;
  justify-content: space-between;
}

.popup-event .buttons button {
  border: none;
  color: #29771c;
  background-color: rgba($green, 0.04);
  padding: 5px 10px;

  &.cancel {
    background-color: rgba($red, 0.04);
    color: $red;
  }
}
</style>
