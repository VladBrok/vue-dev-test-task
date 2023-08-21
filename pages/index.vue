<template>
  Main page
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/doctor", {
  method: "POST",
  body: {
    name: "vlad1",
    email: "vlad2",
    image: "vlad3",
  },
});
</script>
