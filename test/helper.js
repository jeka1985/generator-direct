'use strict';

var helpers = require('yeoman-test');

module.exports = {

    prepare: function(done, opts, name) {
        helpers.run(require.resolve('../generators/' + name))
            .withArguments(opts.blockName || 'foo')
            .withOptions(opts || {})
            .on('end', done);
    }
};
