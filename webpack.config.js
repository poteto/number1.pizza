const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
      // https://github.com/mrdoob/three.js/issues/9562#issuecomment-372169712
      {
        test: require.resolve('three/examples/js/loaders/OBJLoader'),
        use: ['imports-loader?THREE=three', 'exports-loader?THREE.OBJLoader']
      },
      {
        test: require.resolve('three/examples/js/loaders/MTLLoader'),
        use: ['imports-loader?THREE=three', 'exports-loader?THREE.MTLLoader']
      },
      {
        test: require.resolve('three/examples/js/controls/OrbitControls'),
        use: [
          'imports-loader?THREE=three',
          'exports-loader?THREE.OrbitControls'
        ]
      },
      {
        test: require.resolve('three/examples/js/controls/Detector'),
        use: [
          'imports-loader?THREE=three',
          'exports-loader?THREE.Detector'
        ]
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
