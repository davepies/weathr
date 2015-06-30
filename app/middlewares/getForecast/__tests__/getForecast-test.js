/* eslint-env node */
/* globals describe, it, beforeEach */

'use strict';

var assert = require('assert');
var getForecast = require('../');

describe('Middleware: getForecast', function () {

    var req = null;

    beforeEach(function () {
        req = {
            latLon: [1, 2],
            app: {
                get: function () {
                    return 'thisIsAnAPIKey';
                }
            }
        };
    });

    describe('error handling', function () {
        it('req.latLon is not present', function (done) {
            getForecast({}, null, function (err) {
                assert(err, 'no error has been passed on');
                done();
            });
        });

        it('API key has not been set', function (done) {
            req.app.get = function () {};
            getForecast(req, null, function (err) {
                assert(err, 'no error has been passed on');
                done();
            });
        });
    });

    describe('everything is valid', function () {
        it('assigns an object to req.forecast if req.latLon is present', function (done) {
            getForecast(req, {}, function (err) {
                if (err) {
                    throw err;
                }
                assert(req.forecast);
                assert.equal(typeof req.forecast, 'object');
                done();
            });
        });
    });

});
