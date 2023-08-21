<template>Main page</template>

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
</script>
