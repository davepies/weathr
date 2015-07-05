/* eslint-env node */

'use strict';

var getForecastForLocation = require('../../lib/getForecast');

module.exports = function (req, res, next) {

    var forecastAPIKey;

    if (!req.latLon) {
        return next(new Error('req.latLon is not present'));
    }

    forecastAPIKey = req.app.get('forecastAPIKey');

    if (!forecastAPIKey) {
        return next(new Error('apikey has not been set.'));
    }

    getForecastForLocation(forecastAPIKey, req.latLon, function (err, forecast) {
        if (err) {
            return next(err);
        }

        req.forecast = forecast;

        next();

    });

};
