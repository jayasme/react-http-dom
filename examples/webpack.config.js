const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCDNPlugin = require('webpack-cdn-plugin');

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /(\.css)$/,
        use: ['style-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.ejs',
      title: 'React Http DOM examples',
    }),
    new WebpackCDNPlugin({
      publicPath: '/node_modules',
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'umd/react.development.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'umd/react-dom.development.js',
        },
      ],
    }),
  ],

  devServer: {
    disableHostCheck: true, // a better way is to use "public" to avoid security issue.
    historyApiFallback: true,
  },
};
