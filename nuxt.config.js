const { createClient } = require('contentful')
const apiConfig = require('./api/config')

module.exports = {
  generate: {
    routes () {
      const client = createClient({
        space: process.env.SPACE,
        accessToken: process.env.ACCESS_TOKEN
      })

      return client.getEntries({
        content_type: apiConfig.contentTypes.issues
      }).then(data => data.items.map(item => `/issues/${item.fields.issueNumber}/`))
    }
  },
  env: {
    SPACE: process.env.SPACE || 'fvjzlvrkinc4',
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || '4f4f9e133b04281c5b172963a693cc7881f8db9646426dd6bd179c646b6ee714',
    HOST: process.env.HOST || 'preview.contentful.com'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'news.vuejs.org',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Official Vue.js News' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ]
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
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}
