module.exports = (config) => {
  // https://github.com/maxogden/menubar/issues/188
  // not working :/
  config.target = 'electron-main';
  config.node = {
    __dirname: false,
    __filename: false,
  };

  //https://webpack.electron.build/using-static-assets maybe??

  return config;
};
