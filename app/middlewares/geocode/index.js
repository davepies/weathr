/* eslint-env node */

'use strict';

var getLatLon = require('../../lib/getLatLonForLocation');

module.exports = function (req, res, next) {
    getLatLon(req.params.location, function (err, latLon) {
        if (err) {
            next(err);
        }
        req.latLon = latLon;
        next();
    });
};