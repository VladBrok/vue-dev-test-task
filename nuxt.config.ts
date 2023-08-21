// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt-alt/auth", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/auth/logout",
      home: "/",
      callback: "/auth/callback",
    },
    strategies: {
      google: {
        clientId: process.env.CLIENT_ID,
        codeChallengeMethod: "",
        responseType: "token id_token",
      },
    },
  },
});
