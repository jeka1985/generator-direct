'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    behavior = require('../../common/behaviors/baseBehavior');

module.exports = u.generator.create(Base, behavior, {

    settings: require('./settings'),

    fileExt: '.test.js',

    _getData: function(inputData) {
        return {
            declaration: u.bem.getName(inputData)
        };
    }

});






