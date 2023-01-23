const { defineConfig } = require('@vue/cli-service')
const path = require('path');

const apimock = process.env.API_MOCK == '1'
const apipath = apimock ? 'src/api/api_mock.js' : 'src/api/api.js'

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/github-webapp/',
  configureWebpack: {
    resolve: {
      alias: {
        "~api": path.resolve(__dirname, apipath)
      }
    }
  }
})
