import path from "path";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import webpackConfig from './webpack.config';

const glob = require('glob')

module.exports = {
  name: "client",
  mode: 'production',
  entry: {
    // vendor: ["@babel/polyfill", "react"], // Third party libraries
    ...mapFilenamesToEntries('./src/entrypoints/*.tsx'),
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: "",
    path: path.resolve(__dirname, 'dist'), //destination for bundled output is under ./dist
    filename: "js/[name].js" // names of the bundled file will be name of the entry files (mentioned above)
  },
  optimization: webpackConfig.optimization,
  plugins: [
    // new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    ...webpackConfig.plugins,
  ],
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
};


function mapFilenamesToEntries(pattern) {
  return glob
    .sync(pattern)
    .reduce((entries, filePath) => {
      const [,filename] = filePath.match(/^.+\/(.*)\.tsx$/);
      return { ...entries, [filename]: [filePath] }
    }, {})
}

