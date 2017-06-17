import { combineReducers } from 'redux';
import PagesReducer from './reducer_pages';

const rootReducer = combineReducers({
  posts: PagesReducer
});

export default rootReducer;
