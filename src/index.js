// webpack entry point

// Use webfontloader to import google font(s).
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Open Sans']
  }
});

import "./scss/master.scss";
import "./reactApp";


if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(()=>{
      console.log('Service Worker registered!')
    })
}
