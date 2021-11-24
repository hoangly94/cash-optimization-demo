import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

export default {
  mode: 'production',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: "/",
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        parallel: true,
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'vendor',
    // },
  },
  plugins: [
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
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
    extensions: ['.tsx', '.ts', '.js', '.jsx', ".css"],
    alias: {
      '@config': path.resolve(__dirname, 'config/index.ts'),
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
    fallback: {
      "stream": false,
    },
  },
  devtool: 'source-map',
};