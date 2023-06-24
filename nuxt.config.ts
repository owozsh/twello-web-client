// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
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
});
