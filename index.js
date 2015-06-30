/* eslint-env node */
'use strict';

// Dependencies
// ======================================================================

var express = require('express');
var app = module.exports = express();
var server = null;

//Temp
var getLatLon = require('./app/middlewares/getLatLon');
var getForecast = require('./app/middlewares/getForecast');

// Express Set Up
// ======================================================================

require('./config')(app);

// Routes
// ======================================================================

app.get('/weather/:location',
    getLatLon,
    getForecast,
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

// 400
app.use(function (req, res) {
    res.status(404)
       .render('404', {
            title: 'Not Found.',
            url: req.url
        });
});

// Error Handling
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Error ' + err.message);
});

// Start Server
// ======================================================================

if (!module.parent) {
    server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening on http://%s:%s', host, port);
    });
}
