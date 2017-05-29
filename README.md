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

7. Tell webpack to use css related loaders
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

   * Make sure to install them via npm as well.  Also, sass-loader requires node-sass, so install it as well.
    npm install --save-dev style-loader css-loader autoprefixer-loader sass-loader node-sass
