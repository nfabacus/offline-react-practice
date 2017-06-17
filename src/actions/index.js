import axios from 'axios';

import { FETCH_PAGES } from './types';

const ROOT_URL = 'http://localhost:3090';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/pages`);

  // //With react-promise, you will do like below. (You will first need to install react-promise of course.)
  // return {
  //   type: FETCH_PAGES,
  //   payload: request  //react-pro9mise will resolve the request automatically first before sending it.
  // };

  // With redux-thunk, you will do like below.
  return function(dispatch) {
    request.then(({data}) => { //Once request is resolved, you can send the data in payload, along with type, in dispatch.
      // You can run some logic here.  Action will wait until dispatch is called.

      dispatch({ type: FETCH_PAGES, payload: data });
    });
  };

}
