/* eslint-env node */
/* globals describe, it, beforeEach */

'use strict';


// Dependencies
// ======================================================================

var assert = require('assert');

var rewire = require('rewire');

// Tests
// ======================================================================

describe('Middleware: getForecast', function () {

    var req = null;
    var getForecastMiddleWare = null;

    beforeEach(function () {
        // rewire the middleware
        getForecastMiddleWare = rewire('../');
        getForecastMiddleWare.__set__('getForecastForLocation', getForecastForLocationStub());

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
            getForecastMiddleWare({}, null, function (err) {
                assert(err, 'no error has been passed on');
                done();
            });
        });

        it('API key has not been set', function (done) {
            req.app.get = function () {};
            getForecastMiddleWare(req, null, function (err) {
                assert(err, 'no error has been passed on');
                done();
            });
        });
    });

    describe('everything is valid', function () {
        it('assigns an object to req.forecast', function (done) {
            getForecastMiddleWare(req, {}, function (err) {
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

// Helpers
// ======================================================================

function getForecastForLocationStub() {
    var payload = {};
    return function (apiKey, locationCoords, callback) {
        // make async
        process.nextTick(callback.bind(null, null, payload));
    };
}

