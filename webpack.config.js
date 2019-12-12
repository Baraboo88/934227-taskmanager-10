const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require(`path`);

module.exports = {
  entry: `./src/main.js`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.resolve(__dirname, `public`),
    publicPath: `http://localhost:8000`,
    compress: true,
    watchContentBase: true
  },
  mode: `development`,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`]
    })
  ],
};
