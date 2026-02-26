export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'AisBud — ремонт с гарантией качества',
      meta: [
        { name: 'description', content: 'AisBud — ремонт квартир и домов в Грузии. Полный спектр работ по ремонту и отделке с гарантией качества.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { property: 'og:title', content: 'AisBud — ремонт с гарантией качества' },
        { property: 'og:description', content: 'Ремонт квартир и домов в Грузии. Полный спектр работ по ремонту и отделке.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
