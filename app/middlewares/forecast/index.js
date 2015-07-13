/* eslint-env node */

'use strict';

// Dependencies
// ======================================================================

var R = require('ramda');

var getForecast = require('../../lib/getForecast');

// Filters
// ======================================================================

var filters = {
    weekly: R.path(['daily']),
    today: R.path(['daily']),
    weekday: R.path(['daily'])
};


// Middleware
// ======================================================================

function forecastMiddlware(forecastType) {

    return function (req, res, next) {
        var forecastAPIKey;

        if (!req.latLon) {
            return next(new Error('req.latLon is not present'));
        }

        forecastAPIKey = req.app.get('forecastAPIKey');

        if (!forecastAPIKey) {
            return next(new Error('apikey has not been set.'));
        }

        getForecast(forecastAPIKey, req.latLon, function (err, forecastData) {
            if (err) {
                return next(err);
            }

            req.forecast = {
                type: forecastType,
                data: filters.weekly(forecastData)
            };

            next();
        });

    };
}

// Exports
// ======================================================================

module.exports.forecastTypes = Object.keys(filters);

Object.keys(filters).forEach(function (type) {
    module.exports[type] = forecastMiddlware(type);
});
