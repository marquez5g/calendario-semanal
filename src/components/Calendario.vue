<template>
  <div class="demo-app">
    <div class="enviar-horario">
      <button @click="enviarHorario">Enviar horario</button>
    </div>
    <!-- Trigger/Open The Modal -->
    <button id="myBtn" @click="tutorialOpen" class="boton-tutorial">Tutorial</button>

    <!-- The Modal -->
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="tutorialClose">&times;</span>
          <h2>Instrucciones</h2>
        </div>
        <div class="modal-body">
          <p>Ingrese una semana completa haciendo uso de los turnos predeterminados:</p>
         
          <ul>
            <li>Mañana: ingresa disponibilidad de 7 AM a 11 AM de lunes a viernes.</li>
            <li>Tarde: ingresa disponibilidad de 11 AM a 8 PM de lunes a viernes.</li>
            <li>Noche: ingresa disponibilidad de 2 PM a 11 PM de lunes a viernes.</li>
          </ul>
          
          <p>Active las opciones manuales para indicar permisos o vacaciones.</p>
           
           <ul>
            <li>Seleccione el tipo de horario que desea ingresar haciendo clic en uno de los botones 
              (DISPONIBLE, PERMISO, VACACIONES).</li>
            <li>Haga clic y arrastre el mouse para pintar un día con un horario específico.</li>
          </ul>
          <p>Para borrar, haga clic sobre un turno creado.</p>
          
          <p>Al terminar de ingresar los turnos, haga clic en ENVIAR HORARIO.</p>
        </div>
        
      </div>
    </div>
    <div class="predeterminados">
      <label class="label-botones">Establecer semana por turnos </label>
      <button @click="morning">Mañana</button>
      <button @click="tarde">Tarde</button>
      <button @click="noche">Noche</button>
    </div>

    <div class="toggle">
      Opciones manuales

      <label class="switch">
        <input type="checkbox" v-on:click="isHidden = !isHidden" />
        <span class="slider round"></span>
      </label>
    </div>

    <div class="tipo-horario" v-if="!isHidden">
      <label class="label-botones">Tipo de turno </label>

      <button @click="libre">Disponible</button>
      <button @click="permiso">Permiso</button>
      <button @click="vacaciones">Vacaciones</button>
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
var titulo = "Disponible";
var eventosFinales = [];

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },

  data: function() {
    return {
      isHidden: true,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],

        headerToolbar: {
          left: "title",
          center: "",
          right: "today prev,next"
        },
        initialView: "timeGridWeek",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        locale: esLocale,

        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove
      },
      currentEvents: []
    };
  },

  methods: {
    tutorialOpen() {
      // Get the modal
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    tutorialClose() {
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    },
    morning() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let view = calendarApi.view;
      let fechaLunes = view.currentStart;
      let fechaLunesFormatted = formatDate(fechaLunes, {
        month: "2-digit",
        year: "numeric",
        day: "2-digit"
      });
      let fechaLunesArray = fechaLunesFormatted.split("/");
      let year = fechaLunesArray[2];
      let month = fechaLunesArray[0];

      for (let i = 0; i < 5; i++) {
        let day = parseInt(fechaLunesArray[1]) + i;
        let formattedDay = day.toLocaleString("es-CO", {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Disponible",
          start:
            year + "-" + month + "-" + formattedDay.toString() + "T07:00:00",
          end: year + "-" + month + "-" + formattedDay.toString() + "T16:00:00",
          backgroundColor: "#4dffb8",
          borderColor: "#4dffb8",
          textColor: "black"
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
        day: "2-digit"
      });
      let fechaLunesArray = fechaLunesFormatted.split("/");
      let year = fechaLunesArray[2];
      let month = fechaLunesArray[0];

      for (let i = 0; i < 5; i++) {
        let day = parseInt(fechaLunesArray[1]) + i;
        let formattedDay = day.toLocaleString("es-CO", {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Disponible",
          start:
            year + "-" + month + "-" + formattedDay.toString() + "T11:00:00",
          end: year + "-" + month + "-" + formattedDay.toString() + "T20:00:00",
          backgroundColor: "#4dffb8",
          borderColor: "#4dffb8",
          textColor: "black"
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
        day: "2-digit"
      });
      let fechaLunesArray = fechaLunesFormatted.split("/");
      let year = fechaLunesArray[2];
      let month = fechaLunesArray[0];

      for (let i = 0; i < 5; i++) {
        let day = parseInt(fechaLunesArray[1]) + i;
        let formattedDay = day.toLocaleString("es-CO", {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
        TURNO_MORNING.push({
          id: createEventId(),
          title: "Disponible",
          start:
            year + "-" + month + "-" + formattedDay.toString() + "T14:00:00",
          end: year + "-" + month + "-" + formattedDay.toString() + "T23:00:00",
          backgroundColor: "#4dffb8",
          borderColor: "#4dffb8",
          textColor: "black"
        });
      }

      for (let i = 0; i < TURNO_MORNING.length; i++) {
        calendarApi.addEvent(TURNO_MORNING[i]);
      }
    },
    libre() {
      color = "#4dffb8";
      titulo = "Disponible";
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
          textColor: "black"
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
    handleEventAdd(addInfo) {
      eventosFinales.push(addInfo.event);
    },
    enviarHorario() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let eventosActuales = calendarApi.getEvents();
      console.log(eventosActuales);
    }
  }
};
</script>

<style lang="css">
body {
  font-family: "Courier New", Courier, monospace;
  background: #494D5F;
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
  /* background: #ffffff; */
  border-top: 100px;
  margin: 5px 100px;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  height: 1000px;
}

.demo-app-main {
  z-index: -1;
  margin: 30px 20px;
  color: black;
  padding: 3em;
  border-radius: 25px;
  background: #e5eaf5;
  border-top: 100px;
  border-bottom: 100px;
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.fc .fc-button-primary {
  background-color: #8458B3;
  color: #fff;
  border-color: #8458B3;
}
.fc .fc-button-primary:hover {
  background-color: #2e2936;
  color: #fff;
  border-color: #2e2936;
}
.fc .fc-button-primary:disabled{
  background-color: #2e2936;
  color: #fff;
  border-color: #2e2936;
}
.demo-app button {
  display: inline-block;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: white;
  background-color: #8458B3;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.enviar-horario {
  position: fixed;
  bottom: 15px;
  right: 3px;
  z-index: 1;
}
.demo-app button:hover {
  background-color: #2e2936;
}
.demo-app button:active {
  background-color: #2e2936;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  transform: translateY(4px);
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.predeterminados {
  padding: 15px;
  text-align: left;
  width: 80%;
  margin-left: 250px;
  color: white;
}
.tipo-horario {
  text-align: left;
  padding: 15px;
  padding-bottom: 0;
  width: 80%;
  margin-left: 250px;
  top: 0;
  color: white;
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
  width: 80%;
  padding: 15px;
  line-height: 27.988px;
  margin-left: 250px;
  color: white;
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
  background-color: #2e2936;
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
  background-color: #8458B3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #8458B3;
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

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
   /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: none;
  width: 50%; /* Could be more or less, depending on screen size */
  border-radius: 8px;
  box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: justify;
  text-justify: inter-word;
  position: fixed;
  left: 23%;
  bottom: -15%;
  
}
.modal-content h2{
  text-align: center;
  text-justify: inter-word;
  font-size: 120%;
}
.modal-body li{
  font-family: "Courier New", Courier, monospace;
  font-weight: normal;
  font-size: 115%;
  text-transform: none;
}
.modal-body p{
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 117%;
  text-transform: none;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.boton-tutorial{
 position: fixed;
  bottom: 15px;
  left: 3px;
  z-index: 1;
}
.fc-timegrid {
  z-index: 0;
}
</style>
