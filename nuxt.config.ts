// https://nuxt.com/docs/api/configuration/nuxt-config

const SITE_TITLE = 'Board Game Forest | A D3.js Experiment';
const SITE_DESCRIPTION = 'A D3.js experiment with board game data. Each tree represents a board game from the Top 100 Board Games list on BoardGameGeek. Game data is mapped to tree characteristics such as branch angle, branch length, and leaf size.';
const SITE_URL = 'https://boardgameforest.com';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/reset.scss" as *;`,
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: SITE_TITLE,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: SITE_DESCRIPTION,
        },
        {
          name: 'twitter:title',
          content: SITE_TITLE,
        },
        { name: 'twitter:url', content: SITE_URL },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        { name: 'twitter:image', content: '/backdrop.png' },
        { name: 'og:url', content: SITE_URL },
        { name: 'og:title', content: SITE_TITLE },
        {
          name: 'og:description',
          content: SITE_DESCRIPTION,
        },
        { name: 'og:image', content: '/backdrop.png' },
      ],
      style: [],
      script: [],
    },
  },
  imports: {
    dirs: ['stores/**'],
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
  ],
});
