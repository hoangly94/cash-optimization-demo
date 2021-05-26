import path from "path";
import loaderUtils from "loader-utils"
import webpack from 'webpack';
// const webpackMerge = require('webpack-merge');
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// const commonPaths = require('./config/paths');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import webpackConfig from './webpack.config';

const glob = require('glob')

module.exports = {
  name: "client",
  mode: 'production',
  entry: {
    // vendor: ["@babel/polyfill", "react"], // Third party libraries
    index: ["./src/entrypoints/index.tsx"],
    home: ["./src/entrypoints/home.tsx"],
    // ...mapFilenamesToEntries('./src/components/**/**/*.css'),
    /// Every pages entry point should be mentioned here
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //destination for bundled output is under ./dist
    filename: "js/[name].js" // names of the bundled file will be name of the entry files (mentioned above)
  },
  optimization: webpackConfig.optimization,
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    ...webpackConfig.plugins,
  ],
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
};


function mapFilenamesToEntries(pattern) {
  return glob
    .sync(pattern)
    .reduce((entries, filename) => {
      const [, name] = filename.match(/^.+(style.*)\.css$/)
      return { ...entries, [name]: filename }
    }, {})
}
