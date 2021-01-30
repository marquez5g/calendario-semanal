<template>
  <div class="demo-app">
    <div class="botones">
      <div class="predeterminados">
        <label class="label-botones">Horarios predeterminados: </label>
        <button @click="morning">Mañana</button>
        <button @click="current">Tarde</button>
        <button @click="morning">Noche</button>
      </div>

      <div class="tipo-horario">
        <label class="label-botones">Tipo de horario: </label>
        <button @click="libre">Libre</button>
        <button @click="permiso">Permiso</button>
        <button @click="vacaciones">Vacaciones</button>
      </div>
    </div>

    <div class="demo-app-main">
      <FullCalendar
        ref="fullCalendar"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar, { formatDate } from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId, TURNO_MORNING } from "./event-utils";
var color = "#4dffb8";
var titulo = "Libre";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],

        headerToolbar: {
          left: "title",
          center: "",
          right: "today prev,next",
        },
        initialView: "timeGridWeek",
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        locale: esLocale,

        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },

  methods: {
    current() {
      var date = calendarApi.getStart();
      alert("The current date of the calendar is " + date.toISOString());
    },

    morning() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let view = calendarApi.view;
      let fechaLunes = view.currentStart;
      let fechaLunesFormatted = formatDate(fechaLunes, {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
      });

      for (let i = 0; i < 5; i++) {
        let fehcaLunesArray = fechaLunesFormatted.split("/");
        let year = fehcaLunesArray[2];
        let month = fehcaLunesArray[0];
        let day = parseInt(fehcaLunesArray[1]) + i;
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Libre",
          start: year + "-" + month + "-" + day.toString() + "T07:00:00",
          end: year + "-" + month + "-" + day.toString() + "T16:00:00",
          backgroundColor: "#4dffb8",
          borderColor: "#4dffb8",
          textColor: "black",
        });
      }

      for (let i = 0; i < TURNO_MORNING.length; i++) {
        calendarApi.addEvent(TURNO_MORNING[i]);
      }
    },
    libre() {
      color = "#4dffb8";
      titulo = "Libre";
    },
    permiso() {
      color = "#ff884d";
      titulo = "Permiso";
    },
    vacaciones() {
      color = "#669999";
      titulo = "Vacaciones";
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      let title = titulo;
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          backgroundColor: color,
          borderColor: color,
          textColor: "black",
        });
      }
    },

    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<style lang='css'>
body {
  font-family: "Courier New", Courier, monospace;
  background: #00ace6;
}

h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
b,
a {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  text-transform: uppercase;
}
button {
  font-family: "Courier New", Courier, monospace;
  font-weight: 300;
  font-size: 85%;
  text-transform: uppercase;
}
label {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 115%;
  text-transform: uppercase;
}
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  /* display: flex; */
  /* min-height: 100%; */
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  border-radius: 25px;
  background: #ffffff;
  border-top: 100px;
  margin: 5px 100px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 950px;
}

.demo-app-main {
  /* flex-grow: 1; */
  padding: 3em;
  border-radius: 25px;
  background: #ffffff;
  border-bottom: 100px;
  margin: 25px 100px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  opacity: 100%;
}
.demo-app button {
  display: inline-block;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #2c3e50;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.demo-app button:hover {
  background-color: #233241;
}
.demo-app button:active {
  background-color: #233241;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  transform: translateY(4px);
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
.botones {
  display: flexbox;
  /* border-radius: 25px;
  background: #ffffff; */
  height: 100px;
  margin: 10px 100px;
}
.predeterminados {
  padding: 10px;
}
.predeterminados label {
  left: 0%;
}
</style>