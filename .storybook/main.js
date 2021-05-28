const path = require('path');

module.exports = {
  stories: ['../src/components/atoms/*/_stories.tsx'],
  // core: {
  //   builder: "webpack5",
  // },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     configureJSX: true,
    //   },
    // },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
  ).parse,
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.tsx', '.ts', '.js', '.jsx', ".css");
    config.resolve.alias = {
      '_': path.resolve(__dirname, '../src/'),
      '_components': path.resolve(__dirname, '../src/components/'),
      '_atoms': path.resolve(__dirname, '../src/components/atoms/'),
      '_molecules': path.resolve(__dirname, '../src/components/molecules/'),
      '_organisms': path.resolve(__dirname, '../src/components/organisms/'),
      '_templates': path.resolve(__dirname, '../src/components/templates/'),
      '_pages': path.resolve(__dirname, '../src/components/pages/'),
      '_utils': path.resolve(__dirname, '../src/utils/'),
      '~': path.resolve(__dirname, '../src/'),
      '~components': path.resolve(__dirname, '../src/components/'),
      '~atoms': path.resolve(__dirname, '../src/components/atoms/'),
      '~molecules': path.resolve(__dirname, '../src/components/molecules/'),
      '~organisms': path.resolve(__dirname, '../src/components/organisms/'),
      '~templates': path.resolve(__dirname, '../src/components/templates/'),
      '~pages': path.resolve(__dirname, '../src/components/pages/'),
      '~utils': path.resolve(__dirname, '../src/utils/'),
      '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
      '~svg': path.resolve(__dirname, 'src/components/atoms/svg/'),
    };

    // config.module.rules.push({
    //   test: /\.css$/,
    //   exclude: /node_modules/,
    //   use: [
    //     MiniCssExtractPlugin.loader,
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: {
    //           localIdentName: '[local]--[hash:base64:5]',
    //         },
    //         importLoaders: 2,
    //       },
    //     },
    //     {
    //       loader: "postcss-loader",
    //       options: {
    //         config: {
    //           path: path.resolve(__dirname, '../postcss.config.js')
    //         }
    //       }
    //     },
    //   ],
    // }),

    config.module.rules.push(
      {
      test: /\.css$/,
      use: ['postcss-loader'],
      // include: path.resolve(__dirname, '../'),
    });

    // config.module.rules.push(
    //   {
    //   test: /\.css$/,
    //   use: [
      
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: {
    //           localIdentName: '[local]--[hash:base64:5]',
    //         },
    //         importLoaders: 2,
    //       },
    //     },
    //   {
    //     loader: require.resolve('postcss-loader'),
    //     options: {
    //       config: {
    //         path: path.resolve(__dirname, '../postcss.config.js')
    //       }
    //     }
    //   }
    // ],
    //   include: path.resolve(__dirname, '../'),
    // });
    
    return config;
  },
};