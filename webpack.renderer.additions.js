module.exports = (config) => {
  config.module.rules.find((rule) => {
    if (rule && rule.test && rule.test.test('.css')) {
      rule.use = ['style-loader', 'postcss-loader'];
    }

    if (rule?.test?.test('.png') || rule?.test?.test('.gif')) {
      rule.use = ['file-loader'];
    }
  });

  // Remove browser aliases so that we always get node.js versions of modules:
  config.resolve.aliasFields = [];

  config.externals = ['react', 'react-dom'];

  //   config.plugins.push(...[require('tailwindcss'), require('autoprefixer')]);

  return config;
};
