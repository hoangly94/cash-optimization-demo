import path from "path";
import webpackConfig from './webpack.config';
import NodeExternals from 'webpack-node-externals';
import CopyPlugin from 'copy-webpack-plugin';

module.exports = {
  name: "server",
  mode: 'production',
  node: {
    ...webpackConfig.node,
    __dirname: false,
  },
  entry: {
    server: ["./src/server.ts"]
  },
  output: {
    publicPath: "",
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
};
