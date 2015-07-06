/* eslint-env node */

'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('./views/app.jsx');
var Forecast = require('./views/forecast.jsx');

module.exports = (
  <Router.Route path='/weather' handler={App}>
    <Router name='forecast' path=':location' handler={Forecast} />
    <Router name='today' path=':location/today' handler={Forecast} />
    <Router name='daily' path=':location/:weekday' handler={Forecast} />
  </Router.Route>
);
