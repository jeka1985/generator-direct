'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'CSS_GENERATOR_DESC',

    interactions: interactions.base(),

    fileExt: '.css',

    _getData: function(inputData) {

        return {
            declaration: u.bem.getName(inputData)
        };
    }

});
