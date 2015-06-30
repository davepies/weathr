/* eslint-env node */

'use strict';

var assert = require('assert');

var request = require('request');
var R = require('ramda');

var config = {
    endpoint: 'https://api.forecast.io/forecast/',
    units: 'si'
};

module.exports = function (apiKey, locationCoords, callback) {

    var requestUrl;

    assert(apiKey, 'no apiKey has been provided.');
    assert(locationCoords, 'no location coordinates have been provided.');
    assert(R.is(Array), 'location coordinates is not an array.');
    assert(R.is(Function), 'callback is not a function.');

    requestUrl = config.endpoint + apiKey + '/' + locationCoords.join() + '?units=' + config.units;

    request.get(requestUrl, function (err, res, body) {
        var forecastObj;

        if (err) {
            return callback(err);
        }

        console.log('Requesting: ', res.request.href);
        if (res.statusCode !== 200) {
            return callback(new Error('it was not successfull. Status Code: ' + res.statusCode));
        }

        try {
            forecastObj = JSON.parse(body);
        } catch(e) {
            return callback(e);
        }

        callback(null, R.path(['daily'], forecastObj));
    });
};
