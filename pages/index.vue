<template>
  <div>
    <div
      v-if="!doctorId && !isSaveError"
      class="mt-8 flex items-center justify-center"
    >
      <Spinner />
    </div>
    <template v-else-if="!isSaveError">
      <PatientsView title="My Patients" :doctorId="doctorId" />
      <PatientsView title="All Patients" />
    </template>

    <Notification
      v-if="isSaveError"
      text="Error while retrieving an account data."
    />
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";

const auth = useAuth();
const isSaveError = ref(false);
const doctorId = ref("");

if (auth.user) {
  $fetch("/api/doctor", {
    method: "POST",
    body: {
      name: auth.user.name,
      email: auth.user.email,
      image: auth.user.picture,
    },
    key: nanoid(),
  })
    .then((data) => {
      doctorId.value = data?.id || "";
      isSaveError.value = false;
    })
    .catch((err) => {
      console.error(err);
      isSaveError.value = true;
    });
}
</script>
