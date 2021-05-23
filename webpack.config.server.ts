import path from "path";
import webpack from 'webpack';
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
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "src", from: "views", to: "views" },
        { context: "static", from: "images", to: "images" },
        { context: "static", from: "uploads", to: "uploads" },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // filename: `${commonPaths.cssFolder}/[name].[contenthash].css`,
      // chunkFilename: `${commonPaths.cssFolder}/[name].[contenthash].css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: '[name]_[hash]',
              runtimeCompat: false,
              prefixize: true,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      },
      {
        test: /\.ico$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: 'favicon.ico',
        },
      },
    ],
  },
  resolve: {
    // modules: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'node_modules')],
    extensions: ['.tsx', '.ts', '.js', '.jsx', ".css"],
    alias: {
      '_': path.resolve(__dirname, 'src/'),
      '_components': path.resolve(__dirname, 'src/components/'),
      '_atoms': path.resolve(__dirname, 'src/components/atoms/'),
      '_molecules': path.resolve(__dirname, 'src/components/molecules/'),
      '_organisms': path.resolve(__dirname, 'src/components/organisms/'),
      '_templates': path.resolve(__dirname, 'src/components/templates/'),
      '_pages': path.resolve(__dirname, 'src/components/pages/'),
      '_utilities': path.resolve(__dirname, 'src/utilities/'),
      '~': path.resolve(__dirname, 'src/'),
      '~components': path.resolve(__dirname, 'src/components/'),
      '~atoms': path.resolve(__dirname, 'src/components/atoms/'),
      '~molecules': path.resolve(__dirname, 'src/components/molecules/'),
      '~organisms': path.resolve(__dirname, 'src/components/organisms/'),
      '~templates': path.resolve(__dirname, 'src/components/templates/'),
      '~pages': path.resolve(__dirname, 'src/components/pages/'),
      '~utilities': path.resolve(__dirname, 'src/utilities/'),
    },
  },
  externals: [NodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
};
