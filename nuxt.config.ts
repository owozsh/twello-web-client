// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "slide",
      mode: "out-in",
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-vitest",
  ],
  colorMode: {
    dataValue: "theme",
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  googleFonts: {
    families: {
      Ubuntu: true,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.TWELLO_API_URL || "",
      TWELLO_API_URL: process.env.TWELLO_API_URL || "",
    },
  },
});
