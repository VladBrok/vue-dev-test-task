<template>
  <NuxtPage />
</template>

<script setup lang="ts">
useHead({
  title: "Medical history",
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  meta: [
    { name: "msapplication-TileColor", content: "#da532c" },
    { name: "theme-color", content: "#ffffff" },
    { name: "description", content: "A medical history website." },
  ],
});
</script>
