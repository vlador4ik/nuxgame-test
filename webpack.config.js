const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  entry: './src/index.js',
  devServer: {
	port: 8080,
	static: {
		directory: path.join(__dirname, 'public'),
	}
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
	  new HTMLWebpackPlugin({
		  template: './index.html'
	  }),
  ]
};

module.exports = config;