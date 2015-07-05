/* eslint-env node */

'use strict';

// dependencies
// ======================================================================

var express = require('express');
var app = express();
var server = null;

// express set up
// ======================================================================

require('./config')(app);

// routes
// ======================================================================

// forecast
app.use('/weather', require('./app/routes/forecast'));

// 400
app.use(function (req, res) {
    res.status(404)
       .render('404', {
            title: 'Not Found.',
            url: req.url
        });
});

// error handling
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Error ' + err.message);
});

// start server
// ======================================================================

if (!module.parent) {
    server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening on http://%s:%s', host, port);
    });
}

// exports
// ======================================================================

module.exports = app;

