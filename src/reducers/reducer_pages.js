import _ from 'lodash';
import { FETCH_PAGES, FETCH_PAGE, CREATE_PAGE } from '../actions/types';

export default function(state={}, action) { //Receive previous state.  Otherwise, set the default state to an empty object.  Also, receive an action.
  switch (action.type) {
    case FETCH_PAGES:
      return _.mapKeys(action.payload, 'url'); //receives an array in this case, so change it to object by url using lodash mapKeys.
      // example:
      // const pages = [
      //   { id: 4, url: "home", title: 'hi' },
      //   { id: 25, url: "about", title: 'bye' },
      //   { id: 36, url: "contact", title: 'How are you'}
      // ];
      // state = _.mapKeys(pages, 'url')
      // This will turn into
      //   {"home":{"id":4, url: "home", "title":"hi"},"about":{"id":25, url: "home", "title":"bye"},"contact":{"id":36, url: "home", "title":"How are you"}}

    case FETCH_PAGE:
      // console.log("Action.type is FETCH_PAGE!");
      // console.log("State: ", state);
      // console.log("action.payload in reducer_pages: ", action.payload);
      // //ES5 way
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;  // if newState[post.id] already exists, it will just overwrite newState[post.id]. The rest of the state will remain the same.
      // return newState;
      // ES6 way
      const newState = { ...state, [action.payload.url]: action.payload }; //{ ...state, object with new or updated value } creates a new state with copies of objects with new or updated values.
      console.log("newState: ", newState);
      return newState;
      //return _.extend({}, state, { [action.payload.url]: action.payload }); //this also works, using lodash.

    case CREATE_PAGE:
      return { ...state, [action.payload.url]: action.payload };

    default:
      return state;
    }

}
