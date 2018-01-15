import _ from 'lodash';
import { FETCH_NAVLINKS, CREATE_PAGE } from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_NAVLINKS:

      return _.mapKeys(action.payload, 'url');

    case CREATE_PAGE:
      return {
        ...state,
        [action.payload.url]: action.payload
      }

    default:
      return state;
  }
}
