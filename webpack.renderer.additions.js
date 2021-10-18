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

  // https://github.com/maxogden/menubar/issues/188
  // not working
  config.target = 'electron-renderer';
  config.node = {
    __dirname: false,
    __filename: false,
  };

  return config;
};
