'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    behavior = require('../../common/behaviors/baseBehavior'),
    settings = require('./settings');

module.exports = u.generator.create(Base, behavior, {

    settings: settings,

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


