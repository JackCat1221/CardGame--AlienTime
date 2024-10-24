<script setup lang="ts">
// import CardGame from './views/CardGame.vue';
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!-- <CardGame /> -->
  <ul class="flex items-center space-x-12 justify-center py-12">
    <li><router-link to="/">home</router-link></li>
    <li> <router-link to="/card-game">Card Game</router-link></li>
    <li> <router-link to="/alien-time">Alien Time</router-link></li>
  </ul>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
