module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/': { 
        target: 'http://localhost:5000'
      }
    }
  },
};
