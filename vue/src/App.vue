<script setup lang="ts">
// import React from './components/React.vue';
import Trigger from './components/Trigger.vue';
let num = 2;
let flag = false;
function handleClick() {
  console.log(22);
  flag = false;
}
</script>

<template>
  <div>
    {{ num }}
    <button @click="handleClick">+++</button>
    <span :flag="flag">I am just a span</span>
    <!-- <Hello /> -->
    <!-- <React /> -->
    <Trigger />
  </div>
</template>

<style scoped>
button{
  border: 10px solid black;
}
</style>
