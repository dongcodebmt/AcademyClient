export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    middleware: ['auth']
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Academy',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/volt.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/core.js', ssr: false },
    { src: '~/plugins/bootstrap.js', ssr: false },
    { src: '~/plugins/volt.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome'
  ],

  googleFonts: {
    display: 'swap',
    families: {
      'Inter': true,
      Inter: {
        wght: [300, 400, 500, 600, 700, 800]
      },
    }
  },

  fontawesome: {
    component: 'fa',
    suffix: true,
    icons: {
      solid: true,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/component-cache',
    'nuxt-lazy-load'
  ],

  auth: {
    plugins: [ '~/plugins/auth.js' ],
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signout',
      callback: '/auth/callback',
      home: '/'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          data: 'refreshToken',
          global: true,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
        },
        endpoints: {
          login: { url: '/api/auth/token', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: false,
          logout: false
        }
      },
      google: {
        redirectUri: 'http://localhost:3000/auth/callback',
        codeChallengeMethod: '',
        clientId: '1012733307588-t8n56jgi8j1hcmhai7b2phdab8gor6sc.apps.googleusercontent.com',
        responseType: 'token id_token'
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: process.env.API_DOMAIN,
    baseURL: 'https://localhost:44316',
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}
