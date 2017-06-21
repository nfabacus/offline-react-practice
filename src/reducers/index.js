import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PagesReducer from './reducer_pages';
import NavLinksReducer from './reducer_navlinks';

const rootReducer = combineReducers({
  navlinks: NavLinksReducer,
  pages: PagesReducer,
  form: formReducer
});

export default rootReducer;
