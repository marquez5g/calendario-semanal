<template>
  <div class="demo-app">
    <div class="botones">
      <div class="predeterminados">
        <p>
            Elige un horario predeterminado:
        </p>        

        <label class="label-botones">Horarios predeterminados: </label>
        <button @click="morning">Mañana</button>
        <button @click="tarde">Tarde</button>
        <button @click="noche">Noche</button>
      </div>

      <div class="toggle">
        ¿Personalizar?

        <label class="switch">
          <input type="checkbox" v-on:click="isHidden = !isHidden" />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="tipo-horario" v-if="!isHidden">
        <label class="label-botones">Tipo de horario a crear: </label>

        <button @click="libre; lastType = 'libre'" v-bind:class="{btnSelected: lastType == 'libre'}">Disponible</button>
        <button @click="permiso; lastType = 'permiso'" :class="{btnSelected: lastType == 'permiso'}">Permiso</button>
        <button @click="vacaciones; lastType = 'vacaciones'" :class="{btnSelected: lastType == 'vacaciones'}">Vacaciones</button>
      </div>
      <p>Seleccionado: {{ lastType }}</p>
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
var lastType = "libre";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      isHidden: true,
      lastType,
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
    morning() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let view = calendarApi.view;
      let fechaLunes = view.currentStart;
      let fechaLunesFormatted = formatDate(fechaLunes, {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
      });
      let fechaLunesArray = fechaLunesFormatted.split("/");
      let year = fechaLunesArray[2];
      let month = fechaLunesArray[0];

      for (let i = 0; i < 5; i++) {
        let day = parseInt(fechaLunesArray[1]) + i;
        let formattedDay = day.toLocaleString("es-CO", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Disponible",
          start:
            year + "-" + month + "-" + formattedDay.toString() + "T07:00:00",
          end: year + "-" + month + "-" + formattedDay.toString() + "T16:00:00",
          backgroundColor: "#4dffb8",
          borderColor: "#4dffb8",
          textColor: "black",
        });
      }

      for (let i = 0; i < TURNO_MORNING.length; i++) {
        calendarApi.addEvent(TURNO_MORNING[i]);
      }
    },
    tarde() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let view = calendarApi.view;
      let fechaLunes = view.currentStart;
      let fechaLunesFormatted = formatDate(fechaLunes, {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
      });
      let fechaLunesArray = fechaLunesFormatted.split("/");
      let year = fechaLunesArray[2];
      let month = fechaLunesArray[0];

      for (let i = 0; i < 5; i++) {
        let day = parseInt(fechaLunesArray[1]) + i;
        let formattedDay = day.toLocaleString("es-CO", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Libre",
          start:
            year + "-" + month + "-" + formattedDay.toString() + "T11:00:00",
          end: year + "-" + month + "-" + formattedDay.toString() + "T20:00:00",
          backgroundColor: "#4dffb8",
          borderColor: "#4dffb8",
          textColor: "black",
        });
      }

      for (let i = 0; i < TURNO_MORNING.length; i++) {
        calendarApi.addEvent(TURNO_MORNING[i]);
      }
    },
    noche() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let view = calendarApi.view;
      let fechaLunes = view.currentStart;
      let fechaLunesFormatted = formatDate(fechaLunes, {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
      });
      let fechaLunesArray = fechaLunesFormatted.split("/");
      let year = fechaLunesArray[2];
      let month = fechaLunesArray[0];

      for (let i = 0; i < 5; i++) {
        let day = parseInt(fechaLunesArray[1]) + i;
        let formattedDay = day.toLocaleString("es-CO", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Libre",
          start:
            year + "-" + month + "-" + formattedDay.toString() + "T14:00:00",
          end: year + "-" + month + "-" + formattedDay.toString() + "T23:00:00",
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
          `¿Seguro que quieres borrar el turno '${clickInfo.event.start}'?`
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
p,
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
  height: 1000px;
}

.demo-app-main {
  /* flex-grow: 1; */
  padding: 3em;
  border-radius: 25px;
  background: #ffffff;
  border-top: 100px;
  border-bottom: 100px;
  margin: 70px 100px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  height: 200px;
  margin: 10px 100px;
}
.predeterminados {
  padding: 15px;
  text-align: left;
  width: 65%;
  margin: auto;
}
.tipo-horario {
  padding: 15px 15px;
  text-align: left;
  width: 65%;
  margin: auto;
}
.predeterminados label {
  left: 0%;
}
.toggle {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 115%;
  text-transform: uppercase;
  text-align: left;
  width: 65%;
  margin: auto;
}
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2c3e50;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2c3e50;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(22px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.btnSelected {
    background-color: #14416e !important;
}

</style>