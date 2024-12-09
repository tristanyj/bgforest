// https://nuxt.com/docs/api/configuration/nuxt-config

const SITE_TITLE = 'Board Game Trees — The 100 best board games of all-time re-imagined as trees';
const SITE_DESCRIPTION = 'D3.js experiment to visualize board games as generative trees. Data is sourced from the BoardGameGeek Top 100 list of all-time. Game properties are mapped to tree characteristics such as branch angle, branch length, leaf size or color.';
const SITE_URL = 'https://gametrees.tristanyj.com';

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
    '@nuxt/image',
  ],
});
