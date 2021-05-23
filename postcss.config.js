const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const postCSSImport = require('postcss-import')
const postCSSNested = require('postcss-nested')
const postCssCssVariables = require('postcss-css-variables')()
const postCSSInlineSVG = require('postcss-inline-svg')()
const cssnano = require('cssnano')

const postCSSAutoprefixer = autoprefixer()
const postCssImport = postCSSImport({
  addDependencyTo: webpack,
})

const colorFunction = require('postcss-color-function')

module.exports = {
  plugins: [
    postCssImport,
    postCSSAutoprefixer,
    postCSSNested,
    postCssCssVariables,
    postCSSInlineSVG,
    colorFunction,
    cssnano,
  ],
}

// const isDev = !(/production/i).test(process.env.NODE_ENV);
// const isProd = (/production/i).test(process.env.NODE_ENV);

// plugins = () => {
//   const result = [
//     postCssImport,
//     postCSSAutoprefixer,
//     postCSSNested,
//     postCssCssVariables,
//     postCSSInlineSVG,
//     colorFunction,
//   ];

//   // if (isDev) {
//   //   result.push.apply(result, [
//   //     require('postcss-reporter')(),
//   //     require('postcss-browser-reporter')(),
//   //   ]);
//   // }

//   // if (isProd) {
//   //   result.push.apply(result, [
//   //     require("cssnano")({ autoprefixer: false })
//   //   ]);
//   // }

//   return result;
// };

// module.exports = {
//   plugins: [
//     postCssImport,
//     postCSSAutoprefixer,
//     postCSSNested,
//     postCssCssVariables,
//     postCSSInlineSVG,
//     colorFunction,
//   ]
// };
