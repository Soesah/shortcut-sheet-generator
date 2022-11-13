module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 8585,
    proxy: {
      '/api': {
        target: 'http://localhost:8584',
        changeOrigin: true,
      },
    },
  },
};
