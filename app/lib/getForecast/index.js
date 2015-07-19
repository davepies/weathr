/* eslint-env node */

'use strict';

// dependencies
// ======================================================================

var assert = require('assert');

var request = require('request');
var R = require('ramda');
var Cache = require('node-cache');

// Defaults
// ======================================================================

var defaults = {
    endpoint: 'https://api.forecast.io/forecast/',
    units: 'si'
};

// cache - stdTTL (ttl in seconds)
var forecastCache = new Cache({ stdTTL: 60 * 10 });

// Private
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

        callback(null, forecastObj);
    });
}

function getForecastData(url, callback) {

    var cachedData = forecastCache.get(url);

    if (cachedData) {
        return callback(null, cachedData);
    }

    // request if url hasn't been cached
    requestForecast(url, function (err, responseData) {
        if (err) {
            return callback(err);
        }
        forecastCache.set(url, responseData);
        callback(null, responseData);
    });
}

// Public
// ======================================================================

function getForecast(apiKey, locationCoords, options, callback) {
    var requestUrl, forecastParams, config;

    // options are, well, optional
    if (R.is(Function, options)) {
        callback = options;
        options = {};
    }

    config = R.merge(defaults, options);

    // make sure everything we need has been passed in
    assert(apiKey, 'no apiKey has been provided.');
    assert(locationCoords, 'no location coordinates have been provided.');
    assert(R.is(Array, locationCoords), 'location coordinates is not an array.');
    assert(R.is(Function, callback), 'callback is not a function.');

    forecastParams = locationCoords;

    // append forecast time to params
    if (options.forecastTime) {
        forecastParams.push(config.forecastTime);
    }

    // build url
    requestUrl = [
        config.endpoint,
        apiKey, '/',
        forecastParams.join(),
        '?units=', config.units
    ].join('');

    console.log('Url: ', requestUrl);

    getForecastData(requestUrl, callback);
}

// Exports
// ======================================================================

module.exports = getForecast;
