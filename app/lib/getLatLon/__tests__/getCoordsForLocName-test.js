/* eslint-env node */
/* globals describe, it, beforeEach */

'use strict';

var assert = require('assert');
var R = require('ramda');
var rewire = require('rewire');
var sinon = require('sinon');


// Tests ======================================================================

describe('Get an array containing the lat/lon of a given location', function () {
    var getCoordsForLocName = null;

    beforeEach(function () {
        getCoordsForLocName = rewire('../');
        getCoordsForLocName.__set__('request', getRequestStub());
    });

    describe('It is called with invalid parameters', function () {
        it('Throws an error if the second argument is not a function', function () {
            assert.throws(getCoordsForLocName.bind(null, 'Sydney'), Error);
        });

        it('Throw ans error if first the first argument is not a string', function () {
            assert.throws(getCoordsForLocName.bind(null));
        });
    });

    describe('It is called with the right parameters', function () {
        it('executes asynchronously', function (done) {
            var isAsync = true;
            getCoordsForLocName('', function (_, coords) {
                isAsync = false;
                done();
            });
            assert.ok(isAsync);
        });

        it('passes an arraylike to the callback', function (done) {
            getCoordsForLocName('Melbourne', function (_, coords) {
                assert(R.isArrayLike(coords), 'the value given to the callback is not arraylike.');
                done();
            });
        });

        it('the arraylike contains 2 items', function (done) {
            getCoordsForLocName('Sydney', function (err, coords) {
                if (err) {
                    return;
                }
                assert.equal(coords.length, 2, 'the arraylike contains ' + coords.length + ' items.');
                done();
            });
        });

        it('returns the right coordinates', function (done) {
            getCoordsForLocName('Sydney', function (_, coords) {
                assert(R.eqDeep([0, 1], coords));
                done();
            });
        });
    });
});

// Helpers ======================================================================

function getRequestStub(body) {

    var requestStub = sinon.stub();

    var res = {
        statusCode: 200
    };

    body = body || {
        results: [
            {
                geometry: {
                    location: {lat: 0, lon: 1}
                }
            },
            {
                geometry: {
                    location: {lat: 1, lon: 10}
                }
            }
        ]
    };

    requestStub.callsArgWithAsync(1, null, res, JSON.stringify(body));

    return requestStub;
}
