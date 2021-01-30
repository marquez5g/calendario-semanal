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
  color: #2c3e50;
}
.header h1 {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  text-transform: uppercase;
  color: azure;
  margin: 0;
}
/* .header {
  position: fixed; 
  top: 0px;
  left: 0;
  overflow:auto;
  width:100%;
  overflow:hidden; 
  height:70px;
  background: #aa9b9b;
  z-index: 1;
  opacity: 80%;
   
  
} */
/* .main-component{
  position: initial;
  margin-top: 100px;
  z-index: -1;
} */
</style>
