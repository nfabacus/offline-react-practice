# Assemblying a web app boilerplate from scratch using webpack, react, redux, and bootstrap 4 sass.

### Setup webpack
1. Install webpack as npm dev pendency.
    npm install webpack --save-dev
2. Create webpack.config.js.  
    Specify entry and output   
    !important!: see webpack.config.js   
3. Install babel compiler
    npm install --save-dev babel-loader babel-core babel-preset-env babel-preset-stage-1

    babel-loader: helps babel to work together with webpack
    babel-core: compiler
    babel-preset-env: helps babel to translate es versions so that babel core can understand.
    babel-preset-stage-1: required to use ...state syntax for redux.

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
      "presets": ["babel-preset-env", "react", "stage-1"]
    }
    This will tell babel which presets to apply.  These presets are required for the latest syntax to work.
7. Add script tag for bundle.js (compiled source code) to index.html in root.   
  ```
  <script src="/build/bundle.js"></script>
  ```   
  !IMPORTANT! make sure to have '/build/bundle.js' (absolute path) NOT 'build/bundle.js' (relative path).  Otherwise, it will throw an error when you use react router (browserRouter) with nested routes (e.g. '/pages/new').   

### Debugging Tool
   Make sure to add source-map in order to locate a source file location for debugging errors as below.  Otherwise, it will be difficult to find where the error lies in bundle.js.
   devtool: 'source-map'

### Process styles with webpack
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
      ```
      <link rel="stylesheet" href="/build/styles.css" />
      ```   
      !IMPORTANT! make sure to have '/build/styles.css' (absolute path) NOT 'build/styles.css' (relative path).  Otherwise, it will throw an error when you use react router (browserRouter) with nested routes (e.g. '/pages/new').   

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
        'image-webpack-loader' // use image-webpack-loader first. This will compress the images.
      ],
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/
    }

  3) For big images over the limit (e.g. 40Kb here), you will need to make sure to add the below in output.
    publicPath: '/build/' //url-loader can use this path to find big image files that are compiled out of bundle.js to build folder. make sure to put '/' ('../' does not work as webpac-dev-server does not create bundle.js and style.css in build folder) before and after the folder name 'build', otherwise, image link will be like 'build0123223223ds2.jpg', so the link tag in index.html does not work.
  4) Now you can use images in assets folder in your project in two ways as below.
    a) image tag in your react component
      Step1: import or require image.   
       e.g.  
       import SmallImg from '../assets/small.jpg';   
      Step2:
       <img src={SmallImg}/>   
       or   
       <img src={require('../assets/small.jpg')}/>   
    b) include in stylesheet.   
      Step 1: Create a class with background image in your stylesheet.   
      e.g. _master-theme.scss   
      ```   
      .bigImage {
        background-image:url('../assets/big.jpg');  //IMPORTANT!! image url is relative from master.scss which imports _master-theme.
        height: 200px;
        width: 200px;
      }   
      ```   
      Step 2: Just add your css class in your react component.   
      e.g.  
      ```
      <div className="bigImage">Image in style</div>
      ```    

      This is great for your background image.   

### Using google fonts
  1) import webfontloader via npm   
    We can add below to index.js in the root.  
    ```
    import WebFont from 'webfontloader';
    ```   
  2) Then, just change the custom variable(s) for bootstrap fonts.
   You can do this in _custom.scss in custom-theme folder in scss folder. e.g.-   
  ```
  $font-family-base: Vibur !default;
  ```   
  For more info, visit https://www.npmjs.com/package/webfontloader   

### Installing webpack-dev-server
  1) install it via npm
    npm install --save-dev webpack-dev-server    
  2) Add to scripts in package.json:
     "serve:dev": "webpack-dev-server --progress --colors"   
     '--progress' will show the progress of webpack building in percentage.   
  3) Add below to webpack.config.js to prevent errors with single page app when refreshing url in browser (when using webpack dev server)
      devServer: {
        historyApiFallback: true
      }

### Installing a temporary Production Server to test Build code
  1) Install superstatic server via npm
    npm install --save superstatic   
  2) Configure the server.     
    - Create a file called superstatic.json   
    - Tell it to redirect any routes to index.html. VERY IMPORTANT!   
    ```
    {
      "rewrites": [
        {"source":"/**","destination":"/index.html"}
      ]
    }

    ```   
  3) In package.json, add the below script:   
  ```
  "clean": "rimraf build",
  "build": "npm run clean && webpack",
  "serve:pro": "superstatic --host 0.0.0.0 --port 8080 --config superstatic.json"

  ```   
  Make sure to install rimraf as well.   

### Installing React (as well as redux, redux form,etc.)
  npm install --save react react-dom axios lodash prop-types react-redux redux redux-form react-render-html redux-thunk

 1) Create react app container in index.html
    <div class="app"></div>
 2) Create components folder under src folder. You can place react components inside the components folder.

### Installing BrowserRouter
  1) npm install --save react-router-dom react-router   
  2) Add BrowserRouter as below, for example:
```
    const App = ()=> (
      <div>
        <HeaderNav />
        <Main />
      </div>
    )

    const Main =()=>(
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/about" component={ About } />
          <Route path="/contact" component={ Contact } />
        </Switch>
      </div>
    )

    ReactDOM.render((
      <BrowserRouter>
          <App />
      </BrowserRouter>
    ), document.querySelector('.app'));
```

### Installing Bootstrap 4 SASS
  1) Install bootstrap 4<s>, jquery, and tether</s> via npm  
    npm install --save <s>jquery tether</s> bootstrap@4.0.0-alpha.6   
    Later we will install reactstrap and its components which seem to work without jquery and tether.  So, we will not install jquery and tether here.   
  2) Structure your scss files.  
      For example,  
         scss folder:  
            custom-theme (your theme folder):  
                    _custom.scss (custom variables for bootstrap)  
                   _master-theme.scss (add here your own styles and import any other style files you created and separated)  
                   _your other scss style files to be imported to the master-theme.scss  
        master.scss file, which should include below:  
        ```
              // Import any of your custom variables for bootstrap here first.  
              @import "custom-theme/custom";  
              // Then, import bootstrap scss  
              @import "~bootstrap/scss/bootstrap";  
              // Finally import any custom styles.  
              @import "custom-theme/master-theme";  
        ```   
   3) Make sure to import "./scss/master.scss" in index.js in src folder.   
   4) At this point, bootstrap's javascripts are not loaded, and do not work well with react.  So, we will install reactstrap to support bootstrap javascript functionality.
       npm install --save reactstrap react-addons-transition-group react-addons-css-transition-group    
  5) See how to create react bootstrap 4 components using reactstrap below:
      http://reactstrap.github.io/components/alerts/   

### Installing and connecting redux
  1) Install the following:
    npm install --save redux react-redux
    - redux
    - react-redux: This is react bindings for redux, required to make redux work with react.
  2) In reactApp.js, import below:   
      ```
      import { Provider } from 'react-redux';
      import { createStore, applyMiddleware } from 'redux';
      import reducers from './reducers';
      ```
  3) There is no reducer yet, so let's create a root reducer in 'index.js' in the reducers folder.   
    For now, we can have the following lines in index.js.
    ```
    import { combineReducers } from 'redux';

    const rootReducer = combineReducers({
      state: (state = {}) => state
    });

    export default rootReducer;

    ```
  3) Then, create store with middleware as below:    
    ```
    const createStoreWithMiddleware = applyMiddleware()(createStore);
    ```
  4) Now wrap the BrowserRouter component with the provider which contains the store, as below:
     ```
     <Provider store={createStoreWithMiddleware(reducers)}>
     ```
  2) Create actions and reducers folders under src folder.

### Installing and connecting redux-thunk
  1) Install redux-thunk
    npm install --save redux-thunk
  2) Import redux-thunk in reactApp.js
    ```
    import reduxThunk from 'redux-thunk';
    ```
  3) Apply it as middleware
    ```
    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
    ```

### Create action creator
  1) Create index.js under actions folder in src.   
  2) Import axios from 'axios';   
  3) Create type.js to place all the action types in the future.   
  4) Import action type(s) into index.js under actions. - i.g. FETCH_PAGES for now.   
  5) Create a function e.g. fetchPosts() {... }   
    Check index.js under actions.   
     With redux-thunk, You can make a request and dispatch it as a payload in the dispatch.   

### Work On reducers
  1) Link to the rootReducer the pageReducer you are going to create, in index.js under the reducer folder.
  2) create reducer_pages.js for page


### Using redux-form   
  1) Make sure redux-form is already installed via npm.   
  2) Add formReducer in index.js in the reducers folder.   
    ```
    import { reducer as formReducer } from 'redux-form';       
    ```   
    Then, add it to rootReducer.   
    ```
    const rootReducer = combineReducers({
      navlinks: NavLinksReducer,
      pages: PagesReducer,
      form: formReducer
    });   
    ```   
  3) Build PageNew Component   
    1. Wire up react component with redux using connect   
      ```
      connect(null,{})(PageNew)   
      ```   
    2. Wire it up with reduxForm.  
      ```
      export default reduxForm({
        form: 'PageNewForm'  //giving a name to the form here.   
      })(
        connect(null,{})(PageNew)
      );
      ```   
    3. Add Form and Field components in it.   
      Please see the detailed example in page_new.js.   
    4. Add Form Validation.   
      Create validate function. Pass values in it, and add validation logics in the validate function.  See the example in page_new.js   


###
