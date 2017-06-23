import axios from 'axios';
import { FETCH_PAGES, FETCH_PAGE, FETCH_NAVLINKS, CREATE_PAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function fetchPages() {
  // //With react-promise, you will do like below. (You will first need to install react-promise of course.)
    // const request = axios.get(`${ROOT_URL}/pages`);
  // return {
  //   type: FETCH_PAGES,
  //   payload: request  //react-pro9mise will resolve the request automatically first before sending it.
  // };

  // With redux-thunk, you will do like below.
  return function(dispatch) {
    const request = axios.get(`${ROOT_URL}/pages`);
    request.then(({data}) => { //Once request is resolved, you can pick off the data using { data } out of response.
      // As Below, you can send the data in payload, along with type, in dispatch.
      // Action will wait until dispatch is called.
      console.log("data in array: ", data);
      dispatch({ type: FETCH_PAGES, payload: data });
    }, error=>{
      console.log(error);
    });
  };
}

export function fetchNavLinks() {
  return function(dispatch) {
    const request = axios.get(`${ROOT_URL}/navlinks`);
    request.then(({data}) => {
      dispatch({ type: FETCH_NAVLINKS, payload: data });
    }, error=>{
      console.log(error);
    });
  }
}

export function fetchPage(url) {
  return function(dispatch) {
    const request = axios.get(`${ROOT_URL}/pages/${url}`);
    request.then(({data}) => {
      dispatch({
        type: FETCH_PAGE,
        payload: data
      });
    }, error=>{
      console.log(error);
    });
  }
}

export function createPage(values, callback) {

  return function(dispatch) {
    const request = axios.post(`${ROOT_URL}/pages`, values);
    request.then(({data})=> {
      dispatch({
        type: CREATE_PAGE,
        payload: data
      });
      callback();
    }, error=>{
      console.log(error);
    });
  };  //As soon as the request is is done, whatever you put in as your callback function in  the createPage function will run.

}
