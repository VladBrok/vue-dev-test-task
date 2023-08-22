<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-2xl px-4 py-8 lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new patient
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
        </div>
        <button
          type="submit"
          class="mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 sm:mt-6"
        >
          Add patient
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { z } from "zod";

const avatarUrl = ref("");
const name = ref("");
const email = ref("");
const diagnosis = ref("");
const errors = ref<z.ZodError>();
const isSubmitted = ref(false);

const createPatientSchema = z.object({
  name: z.string().min(1, { message: "Must be 1 or more characters long" }),
  email: z.string().email({ message: "Please specify a valid email" }),
  avatarUrl: z
    .string()
    .url({ message: "Please specify a valid url" })
    .optional(),
  diagnosis: z.string(),
});

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
  const parseResult = createPatientSchema.safeParse({
    avatarUrl: avatarUrl.value,
    name: name.value,
    email: email.value,
    diagnosis: diagnosis.value,
  });

  if (!parseResult.success) {
    errors.value = parseResult.error;
    return false;
  }

  errors.value = undefined;
  return true;
};

const errorMessage = (
  path: keyof z.infer<typeof createPatientSchema>,
): string | null => {
  const message = errors.value?.errors.find((x) =>
    x.path.some((y) => y === path),
  )?.message;

  if (!message) {
    return null;
  }

  return message;
};
</script>
