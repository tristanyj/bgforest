// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/reset.scss" as *;
              @use "~/assets/scss/colors.scss" as *;`,
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          charset: 'utf-8',
        },
      ],
      link: [],
      style: [],
      script: [],
      noscript: [],
    },
  },
});
