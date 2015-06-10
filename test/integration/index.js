/* eslint-env node */
/* global describe, it */

'use strict';

var request = require('supertest');
var app = require('../../');

describe('weather reports', function () {

    describe('display a weather forecast by location', function () {
        describe('requesting a valid location', function () {
            it('responds to /weather/:location', function (done) {
                request(app)
                    .get('/weather/sydney')
                    .expect(200, done);
            });
        });
    });

});
