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
    allowedHosts: 'all', // allow requests from any host (needed for Gitpod)
    proxy: [
      {
        context: ['/api'], // proxy all /api requests to backend
        target: process.env.API_PROXY_TARGET || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
