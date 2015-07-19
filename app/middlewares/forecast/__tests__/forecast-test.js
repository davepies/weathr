/* eslint-env node */
/* globals describe, it, beforeEach */

'use strict';


// Dependencies
// ======================================================================

var assert = require('assert');

var rewire = require('rewire');

// Tests
// ======================================================================

describe('Middleware: forecast', function () {

    var req = null;
    var forecast = null;

    beforeEach(function () {
        // rewire the middleware
        forecast = rewire('../');
        forecast.__set__('getForecast', getForecastStub());

        req = {
            params: {
                weekday: false
            },
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
            forecast.weekly({}, null, function (err) {
                assert(err, 'no error has been passed on');
                done();
            });
        });

        it('API key has not been set', function (done) {
            req.app.get = function () {};
            forecast.weekly(req, null, function (err) {
                assert(err, 'no error has been passed on');
                done();
            });
        });
    });

    describe('everything is valid', function () {
        it('assigns an object to req.forecast', function (done) {
            forecast.weekly(req, {}, function (err) {
                if (err) {
                    throw err;
                }
                assert(req.forecast);
                assert.equal(typeof req.forecast, 'object');
                done();
            });
        });
        it('adds the right type forecast type to req.forecast', function (done) {
            forecast.forecastTypes.forEach(function (forecastType, i) {
                forecast[forecastType](req, {}, function (err) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(req.forecast.type, forecastType);

                    if (i === forecast.forecastTypes.length - 1) {
                        done();
                    }
                });
            });
        });
    });

});

// Helpers
// ======================================================================

function getForecastStub() {
    var payload = {};
    return function (apiKey, locationCoords, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        // make async
        process.nextTick(callback.bind(null, null, payload));
    };
}

