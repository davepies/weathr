/* eslint-env node */

'use strict';

// Dependencies
// ======================================================================

var moment = require('moment');
var getForecast = require('../../lib/getForecast');

// Private
// ======================================================================

var forecastTypes = ['weekly', 'weekday', 'today'];

function getForecastTime(forecastType, weekday) {
    var forecastTime;

    switch (forecastType) {
        case 'weekday':
            forecastTime = moment().day(weekday);
            break;
        case 'today':
            forecastTime = moment().day('today');
            break;
        default:
            return false;
    }

    return forecastTime.startOf('day').format();
}

// Middleware
// ======================================================================

function forecastMiddlware(forecastType) {
    return function (req, res, next) {
        var forecastAPIKey, forecastTime;

        if (!req.latLon) {
            return next(new Error('req.latLon is not present'));
        }

        forecastAPIKey = req.app.get('forecastAPIKey');

        if (!forecastAPIKey) {
            return next(new Error('apikey has not been set.'));
        }

        forecastTime = getForecastTime(forecastType, req.params.weekday);

        getForecast(
            forecastAPIKey,
            req.latLon,
            { forecastTime: forecastTime },
            function (err, forecastData) {
                if (err) {
                    return next(err);
                }

                req.forecast = {
                    type: forecastType,
                    data: forecastData
                };

                next();
            }
        );

    };
}

// Exports
// ======================================================================

module.exports.forecastTypes = forecastTypes;

forecastTypes.forEach(function (type) {
    module.exports[type] = forecastMiddlware(type);
});
