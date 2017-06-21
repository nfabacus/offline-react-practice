// webpack entry point

// Use webfontloader to import google font(s).
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Open Sans']
  }
});

// import "bootstrap/dist/js/bootstrap.min";   This is no longer necessary as we are now going to use reactstrap library.
import "./scss/master.scss";
import "./reactApp";
