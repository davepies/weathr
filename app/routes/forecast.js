/* eslint-env node */

'use strict';

// Dependencies
// ======================================================================

var router = require('express').Router();

// middlewares
var geocode = require('../middlewares/geocode');
var forecast = require('../middlewares/forecast');

// Routes
// ======================================================================

router.get('/:location',
    geocode,
    forecast,
    function (req, res, next) {

        var locationName = req.params.location.charAt(0).toUpperCase() + req.params.location.slice(1);

        res.format({
            'application/json': function () {
                res.send(req.forecast);
            },
            'text/html': function () {
                res.render(req.url, {
                    title: 'Weather forecast for: ' + locationName,
                    location: locationName,
                    forecast: req.forecast
                });
            }
        });

    }
);


module.exports = router;