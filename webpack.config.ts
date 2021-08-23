import path from "path";
import loaderUtils from "loader-utils"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// const commonPaths = require('./config/paths');

export default {
  node:{
    // tls: 'empty',
    // Buffer: true,
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
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
                // getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                //   if (!options.context)
                //     options.context = loaderContext.options && typeof loaderContext.options.context === "string" ? loaderContext.options.context : loaderContext.context;
                //   const pathArray = loaderContext.resourcePath.split('\\');
                //   const newPath = pathArray.slice(0, pathArray.length - 1).join('\\') + '/' + localName;
                //   var request = path.relative(options.context, newPath);
                //   options.content = options.hashPrefix + request + "+" + localName;
                //   localIdentName = localIdentName.replace(/\[local\]/gi, localName);
                //   const hash = loaderUtils.interpolateName(loaderContext, localIdentName, options);
                //   return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
                // },
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
      '@config': path.resolve(__dirname, 'config/index.ts'),
      '_': path.resolve(__dirname, 'src/'),
      '_components': path.resolve(__dirname, 'src/components/'),
      '_atoms': path.resolve(__dirname, 'src/components/atoms/'),
      '_molecules': path.resolve(__dirname, 'src/components/molecules/'),
      '_organisms': path.resolve(__dirname, 'src/components/organisms/'),
      '_templates': path.resolve(__dirname, 'src/components/templates/'),
      '_pages': path.resolve(__dirname, 'src/components/pages/'),
      '~': path.resolve(__dirname, 'src/'),
      '~components': path.resolve(__dirname, 'src/components/'),
      '~atoms': path.resolve(__dirname, 'src/components/atoms/'),
      '~molecules': path.resolve(__dirname, 'src/components/molecules/'),
      '~organisms': path.resolve(__dirname, 'src/components/organisms/'),
      '~organisms.custom': path.resolve(__dirname, 'src/components/organisms.custom/'),
      '~bases': path.resolve(__dirname, 'src/components/bases/'),
      '~commons': path.resolve(__dirname, 'src/components/commons/'),
      '~features': path.resolve(__dirname, 'src/components/features/'),
      '~features.custom': path.resolve(__dirname, 'src/components/features.custom/'),
      '~templates': path.resolve(__dirname, 'src/components/templates/'),
      '~pages': path.resolve(__dirname, 'src/components/pages/'),
      '~stores': path.resolve(__dirname, 'src/stores/'),
      '~utils': path.resolve(__dirname, 'src/utils/'),
      '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
      '@hocs': path.resolve(__dirname, 'src/hocs/index.tsx'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index.tsx'),
      '~svg': path.resolve(__dirname, 'src/components/commons/svg/'),
    },
    fallback: { "stream": false },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    // contentBase: commonPaths.devServerContentBase,
    compress: true,
    port: 4000,
  },
};

