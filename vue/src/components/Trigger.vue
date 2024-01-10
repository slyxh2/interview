<script setup lang="ts">
import { ref, shallowRef } from 'vue';

let count = ref<number>(0);
let count2 = shallowRef({ count: 1 });
console.log(count);
console.log(count2);

function handleClick() {
    // count.value++;
    count2.value.count = 10
}

</script>

<template>
    <h1>Demo for Reactive concept</h1>
    <h2>{{ count }}</h2>
    <h2>{{ count2.count }}</h2>
    <button @click="handleClick">Add</button>
</template>

<style scoped>
h1{
  color: red;
}
</style>
