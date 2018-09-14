const { resolve } = require('path')
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode: mode,
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
