<template>
  <PatientForm :patient-id="id" />
</template>

<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id.toString());
</script>
