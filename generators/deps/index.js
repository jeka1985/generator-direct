'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'DEPS_GENERATOR_DESC',

    interactions: interactions.base().concat(interactions.pick([
        'baseBlock',
        'baseModel',
        'implements'
    ])),

    fileExt: '.deps.js',

    _getData: function(inputData) {
        var mustDeps = [],
            shouldDeps = [];

        return ['baseBlock', 'baseModel', 'implements'].reduce(function(hash, key) {

            inputData[key] && hash.mustDeps.push(inputData[key]);

            return hash;

        }.bind(this), { mustDeps: mustDeps, shouldDeps: shouldDeps });
    }

});


