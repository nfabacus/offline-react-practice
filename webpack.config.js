const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
OfflinePlugin = require('offline-plugin')

// const webpack = require('webpack');  //need to import here to use for webpack.ProvidePlugin at the bottom of this file.

const config = {
  entry: {
    bundle: './src/index.js'  //entry - relative path for entry.
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),  //must be absolute path for output - usually call it 'build' or 'dist'
    filename: 'bundle.js',
    publicPath: '/build/' //url-loader can use this path to find big image files that are compiled out of bundle.js to build folder. make sure to put '/' ('../' does not work as webpac-dev-server does not create bundle.js and style.css in build folder) before and after the folder name 'build', otherwise, image link will be like 'build0123223223ds2.jpg', so the link tag in index.html does not work.
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
             'css-loader', //knows how to deal with css
             'autoprefixer-loader?browsers=last 3 versions',
             'sass-loader?outputStyle=expanded' //this one is applied first.
          ]
        }),
        test: /\.scss$/,
        exclude: /node_modules/
      },
      {
        use: [
          // 'url-loader?limit=40000',  //Then, use url-loader. This one liner is the same as below. Images over 40KB file size will be built in build folder.  Images  40KB or less will be included in bundle.js file.
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader' // use image-webpack-loader first. This will compress the images.
        ],
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"), //after css-loader, styles are caught and combined into this 'style.css' file.
    // new webpack.ProvidePlugin({  //ProvidePlugin will automatically load modules instead of having to import or require them everywhere.
    //   'jQuery': 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.$': 'jquery',
    //   Tether: "tether",
    //   "window.Tether": "tether"
    // }),
    new OfflinePlugin({
      publicPath: '/',
      caches: {
        main: [
          'styles.css',
          'bundle.js',
        ],
        additional: [
          ':externals:'
        ],
        optional: [
          ':rest:'
        ]
      },
      externals: [
        '/'
      ],
      ServiceWorker: {
        navigateFallbackURL: '/'
      },
      AppCache: {
        FALLBACK: {
          '/': '/offline-page.html'
        }
      }
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};

module.exports = config;
