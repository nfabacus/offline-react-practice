import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import reduxThunk from 'redux-thunk';

import HeaderNav from './components/shared/header-nav';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import PagesIndex from './components/pages/pages_index';
import PageShow from './components/pages/page_show';
import PageNew from './components/pages/page_new/index';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

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
      <Route exact path="/pages" component={ PagesIndex } />
      <Route path="/pages/new" component={ PageNew } />
      <Route path="/:url" component={ PageShow } />
    </Switch>
  </div>
)

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
), document.querySelector('.app'));
