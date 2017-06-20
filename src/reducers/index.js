import { combineReducers } from 'redux';
import PagesReducer from './reducer_pages';
import NavLinksReducer from './reducer_navlinks';

const rootReducer = combineReducers({
  navlinks: NavLinksReducer,
  pages: PagesReducer
});

export default rootReducer;
