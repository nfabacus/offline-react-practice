var path = require('path');

const config = {
  entry: {
    bundle: './src/index.js'  //entry - relative path for entry.
  },
  output: {
    path: path.resolve(__dirname, 'build'),  //must be absolute path for output - usually call it 'build' or 'dist'
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
            'style-loader', //Takes CSS imports and adds them to the HTML document
            'css-loader', //knows how to deal with css
            'autoprefixer-loader?browsers=last 3 versions',
            'sass-loader?outputStyle=expanded' //this one is applied first.
        ],
        test: /\.scss$/,
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
