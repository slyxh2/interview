<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log(this)
})


</script>

<template>
  <h1>Hello World</h1>
</template>

<style scoped>
h1{
  color: red;
}
</style>
