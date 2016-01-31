'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

module.exports = {

    prepare: function(done, opts, name, blockName) {
        helpers.run(require.resolve('../generators/' + name))
            .inDir(path.join(__dirname, 'temp'), function () {
                fs.writeFileSync('.yo-rc.json', fs.readFileSync('../../.yo-rc.json'));
            })
            .withArguments(blockName || 'foo')
            .withOptions(opts || {})
            .on('end', done);
    }
};
