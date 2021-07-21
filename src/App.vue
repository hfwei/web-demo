<template>
  <div id="app">
    <router-view></router-view>
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #2c3e50;
}
</style>
