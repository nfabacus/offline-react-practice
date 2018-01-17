// webpack entry point

// Use webfontloader to import google font(s).
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Open Sans']
  }
});

import { install } from 'offline-plugin/runtime'

import "./scss/master.scss";
import "./reactApp";

install()
