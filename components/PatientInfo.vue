<template>
  <div class="w-full rounded-lg bg-white dark:bg-gray-800">
    <div class="flex flex-col items-center pb-10">
      <img
        class="mb-3 h-24 w-24 rounded-full shadow-lg"
        :src="patient.image || ''"
        :alt="`${patient.name}'s avatar'`"
      />
      <h2 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ patient.name }}
      </h2>
      <span class="mb-1 text-sm text-gray-500 dark:text-gray-400">{{
        patient.email
      }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400"
        >Registered on {{ formatDate(patient.registrationDate) }}</span
      >
    </div>

    <div>
      <h3 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        Detailed diagnosis
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ patient.diagnosis }}
      </p>
    </div>

    <div>
      <h3 class="mb-3 mt-6 text-xl font-medium text-gray-900 dark:text-white">
        Doctors
      </h3>
      <ul v-if="patient.doctors.length">
        <li
          v-for="doctor in patient.doctors"
          :key="doctor.id"
          class="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <img :src="doctor.image || ''" class="h-6 w-6 rounded-full" />
          <span>{{ doctor.name }}</span>
        </li>
      </ul>
      <span v-else>—</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Patient } from "~/server/api/patient.get";

defineProps<{ patient: Patient }>();
</script>
