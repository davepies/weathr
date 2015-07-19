/* eslint-env node */

'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('./views/app.jsx');

var ForecastWeekly = require('./views/forecasts/weekly.jsx');
var ForecastDaily = require('./views/forecasts/daily.jsx');

module.exports = (
  <Router.Route path='/weather' handler={App}>
    <Router name='forecast' path=':location' handler={ForecastWeekly} />
    <Router name='today' path=':location/today' handler={ForecastDaily} />
    <Router name='daily' path=':location/:weekday' handler={ForecastDaily} />
  </Router.Route>
);
