/* global describe, it */

var create = require('../lib/create.js');
var path = require('path');
var should = require('should');

var nodeps = path.join(__dirname, './fixtures/nodeps/__elem/_mod');
var withdeps = path.join(__dirname, './fixtures/withdeps');
var errordeps = path.join(__dirname, './fixtures/errordeps');

describe('BEMobject.create', function () {
    it('should create block without deps file', function (done) {
        create(nodeps, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                block: 'nodeps',
                elem: 'elem',
                mod: 'mod',
                level: path.join(__dirname, 'fixtures'),
                bem: 'nodeps__elem_mod',
                path: nodeps
            });
            done();
        });
    });

    it('should create block without deps file', function (done) {
        create(withdeps, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                path: withdeps,
                block: 'withdeps',
                level: path.join(__dirname, 'fixtures'),
                bem: 'withdeps',
                require: [{ block: 'me' }],
                expect: undefined,
                ignore: undefined
            });
            done();
        });
    });

    it('should pass error on syntax errors in deps.js file', function (done) {
        create(errordeps, function (err) {
            should.exist(err);
            done();
        });
    });
});
