/* eslint-env node */

'use strict';

module.exports = function (req, res, next) {

    if (!req.latLon) {
        return next(new Error('req.latLon is not present'));
    }

    if (!req.app.get('forecastAPIKey')) {
        return next(new Error('apikey has not been set.'));
    }

    req.forecast = {};

    next();

};
