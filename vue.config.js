const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: 'minigame-dice-roll',
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all"
  }
})
