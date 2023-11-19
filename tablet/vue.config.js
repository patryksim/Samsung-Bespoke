const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      '': {
        target: 'http://localhost:3000',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
        '@api': path.join(__dirname, 'src/api'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@components': path.join(__dirname, 'src/components'),
        '@composables': path.join(__dirname, 'src/composables'),
        '@router': path.join(__dirname, 'src/router'),
        '@service': path.join(__dirname, 'src/service'),
        '@stores': path.join(__dirname, 'src/stores'),
        '@styles': path.join(__dirname, 'src/styles'),
        '@views': path.join(__dirname, 'src/views'),
      },
    },
  },
});
