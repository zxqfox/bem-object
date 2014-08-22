/* global describe, it */

var create = require('../lib/create.js');
var path = require('path');
var should = require('should');

var modvalue = path.join(__dirname, './fixtures/nodeps/__elem/_mod/nodeps__elem_mod_true.css');
var nodeps = path.join(__dirname, './fixtures/nodeps/__elem/_mod');
var withdeps = path.join(__dirname, './fixtures/withdeps');
var errordeps = path.join(__dirname, './fixtures/errordeps');

describe('BEMobject.create', function () {
    it('should create block from mod_value file', function (done) {
        create(modvalue, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                block: 'nodeps',
                elem: 'elem',
                mod: 'mod',
                value: 'true',
                level: path.join(__dirname, 'fixtures')
            });
            bem.should.have.property('path', nodeps);
            bem.should.have.property('bem', 'nodeps__elem_mod_true');
            bem.should.have.property('id', 'nodeps__elem_mod_true');
            done();
        });
    });

    it('should create block without deps file', function (done) {
        create(nodeps, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                block: 'nodeps',
                elem: 'elem',
                mod: 'mod',
                level: path.join(__dirname, 'fixtures')
            });
            bem.should.have.property('path', nodeps);
            bem.should.have.property('bem', 'nodeps__elem_mod');
            bem.should.have.property('id', 'nodeps__elem_mod');
            done();
        });
    });

    it('should create block without deps file', function (done) {
        create(withdeps, function (err, bem) {
            should.not.exist(err);
            bem.should.eql({
                block: 'withdeps',
                level: path.join(__dirname, 'fixtures'),
                require: [{ block: 'me' }],
                value: undefined,
                expect: undefined,
                ignore: undefined
            });
            bem.should.have.property('path', withdeps);
            bem.should.have.property('bem', 'withdeps');
            bem.should.have.property('id', 'withdeps');
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
