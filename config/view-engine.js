/* eslint-env node */

'use strict';

// make `.jsx` file requirable by node
require('node-jsx').install();

var path = require('path');
var express = require('express');
var renderer = require('react-engine');

var pathToPublic = path.join(__dirname, '../public');

var engine = renderer.server.create({
  reactRoutes: path.join(pathToPublic, 'routes.jsx')
});

module.exports = function (app) {

    // use jsx for rendering
    app.engine('.jsx', engine);
    app.set('views', path.join(pathToPublic, 'views'));
    app.set('view engine', 'jsx');
    app.set('view', renderer.expressView);

    app.use(express.static(pathToPublic));
};
