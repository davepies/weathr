/* eslint-env node */

'use strict';

// Dependen
// ======================================================================

var getForecastForLocation = require('../../lib/getForecast');

var FORECAST_TYPES = [ 'weekly', 'today', 'weekday' ];

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

        getForecastForLocation(forecastAPIKey, req.latLon, function (err, forecastData) {
            if (err) {
                return next(err);
            }

            req.forecast = {
                type: forecastType,
                data: forecastData
            };

            next();
        });

    };
}

// Exports
// ======================================================================

module.exports.forecastTypes = FORECAST_TYPES;

FORECAST_TYPES.forEach(function (type) {
    module.exports[type] = forecastMiddlware(type);
});
