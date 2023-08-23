<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-2xl px-4 py-8 lg:py-16">
      <template v-if="patientId && pending"
        ><div class="flex items-center justify-center">
          <Spinner />
        </div>
      </template>
      <template v-else-if="patientId && error">
        <AlertError>Failed to load patient info</AlertError>
      </template>
      <template v-else>
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {{ title }}
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4 flex items-center gap-5">
            <img
              :src="avatarUrl || 'https://placehold.co/400'"
              class="h-16 w-16 rounded-full bg-gray-400 object-cover"
            />
            <div class="w-full">
              <label
                for="avatar"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Avatar url</label
              >
              <input
                type="text"
                name="avatar"
                id="avatar"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="https://example-avatar.png"
                v-model="avatarUrl"
              />
              <InputFieldError>{{ errorMessage("avatarUrl") }}</InputFieldError>
            </div>
          </div>
          <div class="grid gap-2 sm:grid-cols-2 sm:gap-3">
            <div class="w-full">
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="John Doe"
                v-model="name"
              />
              <InputFieldError>{{ errorMessage("name") }}</InputFieldError>
            </div>
            <div class="w-full">
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="text"
                name="email"
                id="email"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="example@mail.com"
                v-model="email"
              />
              <InputFieldError>{{ errorMessage("email") }}</InputFieldError>
            </div>
            <div class="sm:col-span-2">
              <label
                for="description"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Diagnosis</label
              >
              <textarea
                id="description"
                rows="8"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Completely healthy"
                v-model="diagnosis"
              ></textarea>
              <InputFieldError>{{ errorMessage("diagnosis") }}</InputFieldError>
            </div>
            <div class="sm:col-span-2">
              <div class="mb-4 flex items-center justify-between">
                <div
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Doctors
                </div>
                <button
                  type="button"
                  class="inline-flex items-center rounded-lg bg-blue-700 px-2 py-1 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="handleAddDoctorClick"
                >
                  <svg
                    class="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add doctor
                </button>
              </div>
              <div
                v-for="(doctorId, i) in doctorIds"
                :key="i"
                class="mb-5 flex items-start"
              >
                <DoctorAutocomplete v-model="doctorIds[i]" class="w-full" />
                <button
                  type="button"
                  title="Delete doctor"
                  class="ml-4 mt-4"
                  @click="handleDeleteDoctorClick(i)"
                >
                  <IconTrash class="h-5 w-5 text-gray-500 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 sm:mt-6"
          >
            {{ submitButton }}
          </button>
        </form>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { patientSchema } from "~/utils/validation/patient-schema";
import { z } from "zod";

const props = defineProps<{ patientId?: string }>();

const avatarUrl = ref("");
const name = ref("");
const email = ref("");
const diagnosis = ref("");
const doctorIds = ref<string[]>([]);
const errors = ref<z.ZodError>();
const isSubmitted = ref(false);

const patientId = computed(() => props.patientId);
const title = computed(() =>
  patientId.value ? "Update a patient" : "Add a new patient",
);
const submitButton = computed(() =>
  patientId.value ? "Update patient" : "Add patient",
);

const { data, pending, error } = useFetch("/api/patient", {
  query: { id: patientId },
});
const patient = computed(() => patientId.value && data.value?.[0]);

watch(
  patient,
  () => {
    if (!patient.value) {
      avatarUrl.value = "";
      name.value = "";
      email.value = "";
      diagnosis.value = "";
      doctorIds.value = [];
      return;
    }

    avatarUrl.value = patient.value.image || "";
    name.value = patient.value.name;
    email.value = patient.value.email;
    diagnosis.value = patient.value.diagnosis;
    doctorIds.value = patient.value.doctors.map((x) => x.id);
  },
  { immediate: true },
);

watch([isSubmitted, name, avatarUrl, email, diagnosis], () => {
  if (!isSubmitted.value) {
    return;
  }

  validate();
});

const handleSubmit = () => {
  isSubmitted.value = true;
  if (validate()) {
    console.log("success");
  }
};

const validate = (): boolean => {
  const parseResult = patientSchema.safeParse({
    avatarUrl: avatarUrl.value,
    name: name.value,
    email: email.value,
    diagnosis: diagnosis.value,
    doctorIds: doctorIds.value,
  });

  if (!parseResult.success) {
    errors.value = parseResult.error;
    return false;
  }

  errors.value = undefined;
  return true;
};

const errorMessage = (
  path: keyof z.infer<typeof patientSchema>,
): string | null => {
  const message = errors.value?.errors.find((x) =>
    x.path.some((y) => y === path),
  )?.message;

  if (!message) {
    return null;
  }

  return message;
};

const handleAddDoctorClick = () => {
  doctorIds.value.push("");
};

const handleDeleteDoctorClick = (index: number) => {
  doctorIds.value.splice(index, 1);
};
</script>
