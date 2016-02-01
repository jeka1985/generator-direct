'use strict';

var helpers = require('yeoman-test');

module.exports = {

    prepare: function(done, opts, name, blockName) {
        helpers.run(require.resolve('../generators/' + name))
            .withArguments(blockName || 'foo')
            .withOptions(opts || {})
            .on('end', done);
    }
};
