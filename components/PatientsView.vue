<template>
  <div class="p-8">
    <h1 class="mb-8 text-center text-3xl font-bold">{{ title }}</h1>

    <div class="flex h-full flex-col sm:flex-row">
      <div class="basis-1/2 overflow-y-auto pb-8 sm:border-r-2">
        <div class="ml-auto max-h-96 max-w-xl">
          <PatientsList v-model="selectedPatient" :doctor-id="doctorId" />
        </div>
      </div>

      <div class="mt-12 h-full basis-1/2 px-4 pb-8 sm:mt-0 sm:px-8">
        <div class="mr-auto h-full max-w-xl">
          <PatientInfo v-if="selectedPatient" :patient="selectedPatient" />
          <div
            v-else
            class="flex h-full items-center justify-center text-gray-300"
          >
            <div>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                class="mx-auto h-20 w-20 sm:h-32 sm:w-32"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p class="mt-4 text-center text-gray-400">
                Select a patient to view their information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Patient } from "~/server/api/patient.get";

defineProps<{ title: string; doctorId?: string }>();

const selectedPatient = ref<null | Patient>(null);
</script>
