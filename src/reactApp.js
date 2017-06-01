import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import reducers from './reducers';
import HeaderNav from './components/shared/header-nav';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

const App = ()=> (
  <div>
    <HeaderNav />
    <Main />
  </div>
)

const Main =()=>(
  <div className="mt-5 pt-5">
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
