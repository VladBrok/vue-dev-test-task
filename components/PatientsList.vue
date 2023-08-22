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
  <div
    v-else-if="!patients?.length"
    class="flex items-center rounded-lg bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    role="alert"
  >
    <svg
      class="mr-3 inline h-4 w-4 flex-shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <span class="sr-only">Info</span>
    <div>No patients found.</div>
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

const { data, pending, error } = useFetch("/api/patient");
const patients = computed(() => data.value);

defineProps<{
  modelValue: Patient | null;
}>();

defineEmits(["update:modelValue"]);
</script>
