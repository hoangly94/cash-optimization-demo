import path from "path";
const loaderUtils = require( "loader-utils")
import webpack from 'webpack';
import webpackConfig from './webpack.config';
// const webpackMerge = require('webpack-merge');
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import NodeExternals from 'webpack-node-externals';
import TerserPlugin  from 'terser-webpack-plugin';

// const commonPaths = require('./config/paths');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

module.exports = {
  name: "server",
  mode: 'production',
  entry: {
    server: ["./src/server.ts"]
    /// Every pages entry point should be mentioned here
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //destination for bundled output is under ./dist
    filename: "[name].js" // names of the bundled file will be name of the entry files (mentioned above)
  },
  optimization: webpackConfig.optimization,
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "src", from: "views", to: "views" },
        { context: "static", from: "images", to: "images" },
        { context: "static", from: "uploads", to: "uploads" },
      ],
    }),
    ...webpackConfig.plugins,
  ],
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
  externals: [NodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
};
