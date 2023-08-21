<template>
  <div class="h-screen p-8">
    <h1 class="mb-8 text-center text-4xl font-bold">Patients</h1>

    <div class="flex h-full">
      <div class="basis-1/2 overflow-y-auto">
        <PatientsList v-model="selectedPatientId" />
      </div>
      <div class="basis-1/2 border-l-2">Right</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();

const signedInEmail = useCookie("signedInEmail");

// TODO: handle error by showing global toast notification
if (auth.user && signedInEmail.value !== auth.user.email) {
  await useFetch("/api/doctor", {
    method: "POST",
    body: {
      name: auth.user.name,
      email: auth.user.email,
      image: auth.user.picture,
    },
  });

  signedInEmail.value = auth.user.email;
}

const selectedPatientId = ref("");
</script>
