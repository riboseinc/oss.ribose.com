const path = require('path');
const webpack = require('webpack');

let isProduction = (process.env.NODE_ENV === 'production'),
    plugins = [];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }));
}

module.exports = {
  entry: './webpack/entry.js',
  output: {
    path: path.resolve(__dirname, 'src/assets/js/'),
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
};
