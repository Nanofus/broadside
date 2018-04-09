const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'broadside',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'A lightweight CMS for collaborative publishing' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 * 24 * 14 }
    }),
    // Api middleware
    '~/api'
    ],
  // Modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  // Axios
  axios: {
    // proxyHeaders: false
  },
  toast: {
      position: 'bottom-center',
      duration: 1500
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
