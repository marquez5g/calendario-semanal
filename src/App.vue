<template>
  <div id="app">
    <div class="header">
      
        <h1>Cronograma semanal</h1>
      
    </div>
    <div class="main-component">
      <router-view />
    </div>
  </div>
</template>

<script>
/* import Calendario from "./components/Calendario";
export default {
  name: "App",
  componnets: {
    Calendario,
  },
}; */
</script>

<style>
#app {
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b2929;
}
.header h1 {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
}
</style>
