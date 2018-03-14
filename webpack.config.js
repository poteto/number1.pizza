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
        test: /\.(png|obj|mtl)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
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
