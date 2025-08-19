const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: false,
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
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
      REACT_APP_API_BASE_URL: JSON.stringify(process.env.REACT_APP_API_BASE_URL || '')
    }
  })
]
};
