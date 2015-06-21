/* eslint-env node */
'use strict';

// Dependencies
// ======================================================================

var express = require('express');
var app = module.exports = express();

//Temp
var getLatLon = require('./app/middlewares/getLatLon');

// Express Set Up
// ======================================================================

require('./config/setup')(app);

// Routes
// ======================================================================

app.get('/weather/:location',
    getLatLon,
    function (req, res, next) {
        res.render(req.url, {
            title: 'React Engine Express Sample App',
            name: 'Jordan',
            location: req.latLon
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

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});
