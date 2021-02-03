<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
  color: #2c3e50;
}

.locale-switcher {
  position: absolute;
  z-index: 100;
  margin: 10px;
  font-size: 20px;
  background-color: white;
  float: right;
  right: 0;
}
select {
  background-color: white;
  font-size: 20px !important;
  cursor: pointer !important;
}
</style>
