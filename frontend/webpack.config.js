const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),   // ✅ put final build here
    filename: 'bundle.js',
    publicPath: '/',                          // keeps React Router working
    clean: true,                              // ✅ clean old builds safely
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public') }, // ✅ keep serving from public/ during dev
    historyApiFallback: true,
    port: 3000,
    hot: true,
    allowedHosts: 'all',
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5000',
        changeOrigin: true,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_BASE_URL: JSON.stringify(
          process.env.REACT_APP_API_BASE_URL || ''
        ),
      },
    }),
  ],
};
