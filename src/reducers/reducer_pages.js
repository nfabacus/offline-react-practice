import _ from 'lodash';

import { FETCH_PAGES } from '../actions';

export default function(state={}, action) { //Receive previous state.  Otherwise, set the default state to an empty object.  Also, receive an anction.
  switch (action.type) {

  case FETCH_PAGES:
    return _.mapKeys(action.payload.data, 'url'); //receives an array in this case, so change it to object by url using lodash mapKeys.
    // example:
    // const pages = [
    //   { id: 4, url: "home", title: 'hi' },
    //   { id: 25, url: "about", title: 'bye' },
    //   { id: 36, url: "contact", title: 'How are you'}
    // ];
    // state = _.mapKeys(pages, 'url')
    // This will turn into
    //   {"home":{"id":4, url: "home", "title":"hi"},"about":{"id":25, url: "home", "title":"bye"},"contact":{"id":36, url: "home", "title":"How are you"}}


  default:
    return state;
  }

}
