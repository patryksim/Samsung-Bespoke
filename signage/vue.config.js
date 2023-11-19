const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
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
        '@styles': path.join(__dirname, 'src/styles/'),
        '@stComponents': path.join(__dirname, 'src/components/smartthings/'),
        '@stViews': path.join(__dirname, 'src/views/smartthings/'),
      },
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Bespoke Studio',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
});
