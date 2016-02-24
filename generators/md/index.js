'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    behavior = require('../../common/behaviors/baseBehavior');

module.exports = u.generator.create(Base, behavior, {

    settings: require('./settings'),

    fileExt: '.md',

    _getData: function(inputData) {

        return {
            name: u.bem.getName(inputData),
            author: process.env['USER'],
            data: inputData
        };
    }

});

