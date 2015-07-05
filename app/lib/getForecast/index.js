/* eslint-env node */

'use strict';

// dependencies
// ======================================================================

var assert = require('assert');

var request = require('request');
var R = require('ramda');

// defaults
// ======================================================================

var defaults = {
    endpoint: 'https://api.forecast.io/forecast/',
    units: 'si'
};

// private
// ======================================================================

function requestForecast(url, callback) {
    request.get(url, function (err, res, body) {
        var forecastObj;

        if (err) {
            return callback(err);
        }

        // not the response we want
        if (res.statusCode !== 200) {
            return callback(new Error('Request to ' + res.request.href + 'was not successfull. Status Code: ' + res.statusCode));
        }

        try {
            forecastObj = JSON.parse(body);
        } catch(e) {
            return callback(e);
        }

        callback(null, R.path(['daily'], forecastObj));
    });
}


// public
// ======================================================================

function getForecastForLocation(apiKey, locationCoords, options, callback) {

    var requestUrl, config;

    // options are, well, optional
    if (R.is(Function, options)) {
        callback = options;
        config = {};
    }

    config = R.merge(defaults, config);

    // make sure everything we need has been passed in
    assert(apiKey, 'no apiKey has been provided.');
    assert(locationCoords, 'no location coordinates have been provided.');
    assert(R.is(Array, locationCoords), 'location coordinates is not an array.');
    assert(R.is(Function, callback), 'callback is not a function.');

    // build url
    requestUrl = [
        config.endpoint,
        apiKey, '/',
        locationCoords.join(),
        '?units=', config.units
    ].join('');

    requestForecast(requestUrl, callback);

}

// exports
// ======================================================================

module.exports = getForecastForLocation;
