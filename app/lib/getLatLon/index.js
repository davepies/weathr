/* eslint-env node */

'use strict';

var assert = require('assert');
var querystring = require('querystring');
var request = require('request');
var R = require('ramda');

// Defaults
// ======================================================================

var defaults = {
    endpoint: 'http://maps.googleapis.com/maps/api/geocode/json',
    // Function which returns an array: [lat, lan]
    getCoords: R.pipe(
        // get data.results
        R.prop('results'),
        // get the first array item
        R.head,
        // get the properties
        R.path(['geometry', 'location']),
        // turn into array
        R.values
    )
};

// Helpers
// ======================================================================

function appendQueryParameters(url, parametersObj) {
    return url + '?' + querystring.stringify(parametersObj);
}

// Exports
// ======================================================================

function getLatLanCoords(locName, options, callback) {

    var config;

    // no options passed, second argument is callback
    if (R.is(Function, options)) {
        callback = options;
        options = {};
    }

    assert(R.is(Function, callback), 'Second argument is not a function.');
    assert(R.is(String, locName), 'First argument is not a String');

    config = R.merge(defaults, options);

    request(appendQueryParameters(config.endpoint, {address: locName}), function (err, res, body) {
        var coords = [];
        if (err) {
            return callback(err);
        }
        if (res.statusCode !== 200) {
            return callback(new Error('Request statusCode: ' + res.statusCode));
        }

        coords = config.getCoords(JSON.parse(body));

        // Didn't receive lat/lon: Unknown location
        if (coords.length !== 2) {
            return callback(new Error('Unknown Location.'));
        }

        callback(null, coords);
    });
}

module.exports = getLatLanCoords;
