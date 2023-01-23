const { defineConfig } = require('@vue/cli-service')
const { nodeInternals } = require('stack-utils')
const { node } = require('webpack')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/github-webapp/' 
})
