<template>
  <div>
    <div
      class="h-12 sm:h-12 md:h-14 w-screen bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <router-link to="/inicio">
      <img
        class="ml-12 mt-4 h-12 object-contain xl:h-14 w-full object-left"
        src="../assets/images/logo-uah.png"
        alt="Logo UAH"
      />
    </router-link>
    <kalendar :configuration="calendar_settings" :events.sync="events">
      <!-- CREATED CARD SLOT -->
      <div
        slot="created-card"
        slot-scope="{ event_information }"
        class="details-card"
      >
        <h4 class="appointment-title">
          {{ event_information.data.title }}
        </h4>
        <small>
          {{ event_information.data.class }}
        </small>
        <span>
          {{ event_information.data.subject ? "Profesor" : "Organizador" }}:
          {{ event_information.data.planner }}
        </span>
        <span class="time"
          >{{ event_information.start_time.split("T")[1].split("+")[0] }} -
          {{ event_information.start_time.split("T")[1].split("+")[0] }}</span
        >
      </div>
    </kalendar>
  </div>
</template>
<script>
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
        view_type: "week",
        cell_height: 10,
        scrollToNow: false,
        start_day: getCurrentDay(),
        military_time: false,
        day_starts_at: 6,
        day_ends_at: 23,
        overlap: true,
        hide_dates: ["2020-11-09"],
        hide_days: [6],
        read_only: true,
        past_event_creation: true,
      },
      new_appointment: {},
    };
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
