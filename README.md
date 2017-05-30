### Setup webpack
1. Install webpack as npm dev pendency.
    npm install webpack --save-dev
2. Create webpack.config.js.  
    Specify entry and output
3. Install babel compiler
    npm install --save-dev babel-loader babel-core babel-preset-env

    babel-loader: helps babel to work together with webpack
    babel-core: compiler
    babel-preset-env: helps babel to translate es versions so that babel core can understand.

4. Install babel-preset-react for react
    npm install --save-dev babel-preset-react

5. Tell webpack to use babel loader

    module: {
      rules: [
        {
          use: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    }

    This will apply babel-loader only to js files.

6. Create .babelrc file  
    {
      "presets": ["babel-preset-env", "react"]
    }
    This will tell babel which presets to apply.

### Set up styles in webpack
1. Tell webpack to use css related loaders
    {
      use: [
          'style-loader', //Takes CSS imports and adds them to the HTML document
          'css-loader', //knows how to deal with css
          'autoprefixer-loader?browsers=last 3 versions',
          'sass-loader?outputStyle=expanded' //this one is applied first.
      ],
      test: /\.scss$/
      exclude: /node_modules/
    }

2. Make sure to install them via npm as well.  Also, sass-loader requires node-sass, so install it as well.
    npm install --save-dev style-loader css-loader autoprefixer-loader sass-loader node-sass

3. Arrange styles to be extracted separately as a proper stylesheet onto index.html file.
   1)  npm install --save-dev extract-text-webpack-plugin
   2) At the top of the webpack config file, add:
      const ExtractTextPlugin = require('extract-text-webpack-plugin');
  3) Change Use for the style to below:
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
      }

  4) Now add the plugins on the same level as and after modules in webpack config file.
      plugins: [
        new ExtractTextPlugin("styles.css"), //after css-loader, styles are caught and combined into this 'style.css' file.
      ]

      When you run the webpack build process next time, it will automatically create style.css file in your output folder.

  5) Link style.css file in the head of index.html.
      <link rel="stylesheet" href="build/styles.css" />

### Process images with webpack
  1) Install image-webpack-loader, file loader and url-loader via npm
     image-webpack-loader: automatically compress images
     file-loader: required by image-webpack-loader
     url-loader: check the file size of each image and sort out to bundle.js (if small images) and to separate image files (for bigger images)

     npm install --save-dev image-webpack-loader file-loader url-loader

  2) Add Use for image processing to webpack module rules
    {
      use: [
        // 'url-loader?limit=40000',  //Then, use url-loader. This one liner is the same as below. Images over 40KB file size will be built in build folder.  Images  40KB or less will be included in bundle.js file.

        {
          loader: 'url-loader',
          options: { limit: 40000 }
        },
        'image-webpack-loader' // use image-webpack-loader first.
      ],
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/
    }

  3) For big images over the limit (e.g. 40Kb here), you will need to make sure to add the below in output.
       publicPath: 'build/'      //url-loader can use this path to find big image files that are compiled out of bundle.js to build folder.

### Installing webpack-dev-server
  1) install it via npm
    npm install --save-dev webpack-dev-server
  2) Add to scripts in package.json:
     "serve": "webpack-dev-server"

### Installing Bootstrap 4 SASS

### Installing React

### Installing React Router
