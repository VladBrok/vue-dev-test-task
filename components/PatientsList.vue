<template>
  <div v-if="pending" class="mt-16 flex justify-center">
    <Spinner />
  </div>
  <div
    v-else-if="error"
    class="mb-4 rounded-lg bg-red-50 p-4 text-base text-red-800 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    <span class="font-bold"
      >Failed to load patients. Please refresh the page.</span
    >
  </div>
  <div v-else class="w-full bg-white dark:bg-gray-800">
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-300 dark:divide-gray-700">
        <li
          v-for="patient in patients"
          :key="patient.id"
          :class="`px-4 py-3 hover:cursor-pointer hover:bg-gray-200 sm:py-4 ${
            patient.id === modelValue?.id ? 'bg-gray-200' : ''
          }`"
          @click="$emit('update:modelValue', patient)"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8 rounded-full"
                :src="patient.image || ''"
                :alt="`${patient.name}'s avatar'`"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p
                class="truncate text-sm font-medium text-gray-900 dark:text-white"
              >
                {{ patient.name }}
              </p>
              <p class="truncate text-sm text-gray-500 dark:text-gray-400">
                {{ patient.email }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Patient } from "~/server/api/patient.get";

const { data: patients, pending, error } = useFetch("/api/patient");

defineProps<{
  modelValue: Patient | null;
}>();

defineEmits(["update:modelValue"]);
</script>
