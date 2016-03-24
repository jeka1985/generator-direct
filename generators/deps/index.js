'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'DEPS_GENERATOR_DESC',

    interactions: interactions.pick([
        'blockName',
        'elem',
        'modName',
        'modVal',
        'baseBlock',
        'baseModel',
        'implements',
        'delete'
    ]),

    fileExt: '.deps.js',

    _getData: function(inputData) {
        var mustDeps = [],
            shouldDeps = [];

        //shouldDeps.push('i-subscription-manager');

        return ['baseBlock', 'baseModel', 'implements'].reduce(function(hash, key) {

            inputData[key] && hash.mustDeps.push(inputData[key]);

            return hash;

        }.bind(this), { mustDeps: mustDeps, shouldDeps: shouldDeps });
    }

});


