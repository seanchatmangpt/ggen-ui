export default defineNuxtConfig({
  compatibilityDate: '2026-08-27',
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'GGen UI',
      short_name: 'GGen UI',
      description: 'Ontology-driven visual composition workbench for ggen',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#111827'
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabasePublishableKey: ''
    }
  }
})
