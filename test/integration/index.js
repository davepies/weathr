var request = require('supertest');
var app = require('../../');

describe('app', function () {

    describe('/', function () {
        it('responds', function () {
            request(app)
                .get('/')
                .expect(200);
        });
    })

});
