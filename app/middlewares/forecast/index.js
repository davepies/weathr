/* eslint-env node */

'use strict';

// Dependencies
// ======================================================================

var moment = require('moment');
var R = require('ramda');

var getForecast = require('../../lib/getForecast');

// Filters
// ======================================================================

var isSameDay = function (weekday, day) {
    return moment.unix(day.time).isSame(moment().day(weekday), 'day');
};

var filters = {
    weekly: R.path(['daily']),
    weekday: function (forecastData, weekday) {
        var data = R.path(['daily', 'data'], forecastData);
        return R.find(R.partial(isSameDay, weekday), data);
    },
    today: function (forecastData) {
    }
};


// Middleware
// ======================================================================

function forecastMiddlware(forecastType) {

    return function (req, res, next) {
        var forecastAPIKey, weekday;

        if (!req.latLon) {
            return next(new Error('req.latLon is not present'));
        }

        forecastAPIKey = req.app.get('forecastAPIKey');

        if (!forecastAPIKey) {
            return next(new Error('apikey has not been set.'));
        }

        weekday = req.params.weekday;

        getForecast(forecastAPIKey, req.latLon, function (err, forecastData) {
            if (err) {
                return next(err);
            }

            req.forecast = {
                type: forecastType,
                data: filters[forecastType](forecastData, weekday)
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
