/* eslint-env node */
'use strict';

// dependencies
// ======================================================================

// make `.jsx` file requirable by node
require('node-jsx').install();

var path = require('path');
var express = require('express');
var renderer = require('react-engine');

var app = module.exports = express();

// express set up
// ======================================================================

var engine = renderer.server.create({
  reactRoutes: path.join(__dirname, '/public/routes.jsx')
});

app.engine('.jsx', engine);
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'jsx');
app.set('view', renderer.expressView);

app.use(express.static(path.join(__dirname, '/public')));

// routes
// ======================================================================

app.get('/weather/:location', function (req, res) {
    res.render(req.url, {
        title: 'React Engine Express Sample App',
        name: 'Jordan',
        location: req.params.location
    });
});

app.use(function (req, res) {
    res.status(404)
       .render('404', {
            title: 'Not Found.',
            url: req.url
        });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on http://%s:%s', host, port);
});
