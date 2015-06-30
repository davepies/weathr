/* eslint-env node */
/* global describe, it, before, after */

'use strict';

var http = require('http');
var Browser = require('zombie');

var app = require('../../');

var PORT = 3000;

describe('App: Weather Forecasts', function () {

    var server = null;
    var browser = new Browser({ site: 'http://localhost:' + PORT });

    // no console logs from browser
    browser.silent = true;

    before(function () {
        server = http.createServer(app).listen(PORT);
    });

    after(function (done) {
        server.close(done);
    });

    describe('display a weather forecast by location', function () {
        before(function (done) {
            browser.visit('/weather/sydney', done);
        });

        it('is a success', function () {
            browser.assert.success();
        });
    });

});
