const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.ts'),
  target: 'node',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: [
          /node_modules/
        ],
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist')
  }
}
