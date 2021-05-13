module.exports = {
  resolve: {
    alias: {
      apis: "src/apis",
      common: "src/common",
      components: "src/components",
      reducers: "src/reducers",
      contexts: "src/contexts"
    },
  },
  devServer: {
    historyApiFallback: true
  }
};