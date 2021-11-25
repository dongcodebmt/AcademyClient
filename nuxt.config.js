// import path from 'path'
// import fs from 'fs'

export default {
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'example.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'example.crt'))
  //   }
  // },

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
    '~/assets/scss/volt.scss',
    '~/assets/css/custom.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/core.js', ssr: false },
    { src: '~/plugins/bootstrap.js', ssr: false },
    { src: '~/plugins/volt.js', ssr: false },
    { src: '~/plugins/tinymce.js', ssr: false },
    { src: '~/plugins/draggable.js', ssr: false },
    { src: '~/plugins/goodTable.js', ssr: false },
    { src: '~/plugins/prism.js', ssr: false },
    { src: '~/plugins/chartist.js', ssr: false },
    { src: '~/plugins/infinite-loading.js', ssr: false }
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
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/component-cache',
    'nuxt-lazy-load'
  ],

  toast: {
    position: 'top-right',
    theme: "outline" 
  },

  auth: {
    //Custom login with google, facebook
    plugins: ['~/middleware/auth.js'],
    redirect: {
      login: '/auth/signin',
      logout: '/',
      callback: '/auth/callback',
      home: '/'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          data: 'accessToken',
          global: true,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/token', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/user/me', method: 'get' },
          logout: false
        }
      },
      google: {
        redirectUri: process.env.CALLBACK_URL,
        codeChallengeMethod: '',
        clientId: process.env.GOOGLE_CLIENT_ID,
        responseType: 'token id_token'
      },
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: process.env.FACEBOOK_CLIENT_ID,
        scope: ['public_profile', 'email']
      }
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BACKEND_URL,
    credentials: true
    // proxy: true
  },

  // proxy: {
  //   '/api/': {
  //     target: process.env.BACKEND_URL,
  //     secure: false
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}