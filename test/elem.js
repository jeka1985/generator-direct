'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-direct:elem', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/elem'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
