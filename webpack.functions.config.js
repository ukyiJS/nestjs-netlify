module.exports = (options) => ({
  ...options,
  entry: 'functions/index.ts',
  target: 'node',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
  },
});
