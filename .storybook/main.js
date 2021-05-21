const path = require('path');

module.exports = {
  stories: ['../src/components/atoms/*/stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
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
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '_': path.resolve(__dirname, '../src/'),
      '~': path.resolve(__dirname, '../src/'),
      '_components': path.resolve(__dirname, '../src/components/'),
      '_atoms': path.resolve(__dirname, '../src/components/atoms/'),
      '_molecules': path.resolve(__dirname, '../src/components/molecules/'),
      '_organisms': path.resolve(__dirname, '../src/components/organisms/'),
      '_templates': path.resolve(__dirname, '../src/components/templates/'),
      '_pages': path.resolve(__dirname, '../src/components/pages/'),
      '_utilities': path.resolve(__dirname, '../src/utilities/'),
    };
    config.resolve.extensions.push('.tsx', '.ts', '.js', '.jsx', ".css");
    return config;
  },
};