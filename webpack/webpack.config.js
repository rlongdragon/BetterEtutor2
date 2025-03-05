const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fg = require('fast-glob');

const entryPoints = fg.sync(['./src/**/*.ts', './src/**/*.tsx']).reduce((entries, filePath) => {
  const srcDir = path.resolve(__dirname, '..', 'src');
  const relativePathFromSrc = path.relative(srcDir, filePath);
  const entryName = relativePathFromSrc.replace(/\\/g, '/').replace(/\.tsx?$/, '');

  entries[entryName] = filePath;
  return entries;
}, {});

module.exports = {
  mode: "production",
  entry: entryPoints,
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
			{
				test: /\.ttf$/,
				type: 'asset/resource'
			}
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }]
    }),
  ],
};

// https://medium.com/better-programming/creating-chrome-extensions-with-typescript-914873467b65