'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

module.exports = {

    prepare: function(done, opts, name, blockName) {
        helpers.run(require.resolve('../generators/' + name))
            .withArguments(blockName || 'foo')
            .withOptions(opts || {})
            .on('end', done);
    }
};
