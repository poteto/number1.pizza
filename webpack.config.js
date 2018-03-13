const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(obj|mtl)$/,
        use: 'file-loader'
      },
      {
        test: require.resolve('three/examples/js/loaders/OBJLoader'),
        use: ['imports-loader?THREE=three', 'exports-loader?THREE.OBJLoader']
      },
      {
        test: require.resolve('three/examples/js/loaders/MTLLoader'),
        use: ['imports-loader?THREE=three', 'exports-loader?THREE.MTLLoader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
