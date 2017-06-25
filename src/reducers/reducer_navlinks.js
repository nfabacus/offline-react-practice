import _ from 'lodash';
import { FETCH_NAVLINKS, CREATE_PAGE } from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_NAVLINKS:
      console.log("Action.type is FETCH_NAVLINKS!");
      console.log("State: ", state);
      console.log("action.payload in reducer_navlinks: ", action.payload);
      return _.mapKeys(action.payload, 'url');

    case CREATE_PAGE:
      return {
        ...state,
        [action.payload.url]: action.payload
      }

    default:
      console.log("Action.type is Default!");
      console.log("state:", state);
      return state;
  }
}
