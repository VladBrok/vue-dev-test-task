<template>
  <div>
    <PatientsView title="My Patients" :doctorId="doctorId" />
    <PatientsView title="All Patients" />

    <Notification v-if="isSaveError" text="Error while saving an account." />
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";

const auth = useAuth();
const isSaveError = ref(false);
const doctorId = ref("");

if (auth.user) {
  useFetch("/api/doctor", {
    method: "POST",
    body: {
      name: auth.user.name,
      email: auth.user.email,
      image: auth.user.picture,
    },
    key: nanoid(),
  })
    .then(({ data }) => {
      doctorId.value = data.value?.id || "";
      isSaveError.value = false;
    })
    .catch((err) => {
      console.error(err);
      isSaveError.value = true;
    });
}
</script>
