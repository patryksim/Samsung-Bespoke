const requireModule = require.context('.', false, /\.js$/);
const modules = [];

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return;

  modules.push(...requireModule(fileName).default);
});

export default modules;
