// frontend/webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    port: 3000,
    hot: true,
    allowedHosts: 'all', // fixes “Invalid Host header” in Codespaces/Gitpod
    client: {
      overlay: true, // show build/runtime overlay errors in the browser
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
