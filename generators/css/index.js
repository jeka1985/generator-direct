'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    behavior = require('../../common/behaviors/baseBehavior'),
    settings = require('./settings');


module.exports = u.generator.create(Base, behavior, {

    settings: settings,

    fileExt: '.css',

    _getData: function(inputData) {
        return {
            declaration: u.bem.getName(inputData)
        };
    }

});

