/* eslint-env node */

'use strict';

// Dependencies
// ======================================================================

var router = require('express').Router();

// middlewares
var geocode = require('../middlewares/geocode');
var forecast = require('../middlewares/forecast');

// Helpers
// ======================================================================

function formatLocationName(locationName) {
    return locationName.charAt(0).toUpperCase() + locationName.slice(1);
}

// Handlers
// ======================================================================

function renderForecast(req, res, next) {
    var formattedLocationName = formatLocationName(req.params.location);

    res.format({
        'application/json': function () {
            res.send(req.forecast);
        },
        'text/html': function () {
            // need to use originalUrl for react-router to work
            res.render(req.originalUrl, {
                title: 'Weather (' + req.forecast.type + ') forecast for: ' + formattedLocationName,
                location: formattedLocationName,
                forecast: req.forecast
            });
        }
    });
}

// Routes
// ======================================================================

router.get('/:location', geocode, forecast.weekly, renderForecast);
router.get('/:location/today', geocode, forecast.today, renderForecast);
router.get('/:location/:weekday', geocode, forecast.weekday, renderForecast);

// Exports
// ======================================================================

module.exports = router;
