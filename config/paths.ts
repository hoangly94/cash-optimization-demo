const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  componentsPath: path.resolve(__dirname, '..', 'src/components/'),
  outputPath: path.resolve(__dirname, "build"),
  devServerContentBase: path.join(__dirname, "build"),
  entryPath: path.resolve(__dirname, '../', 'src/index.tsx'),
  templatePath: path.resolve(__dirname, '../', 'build/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};