'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'BH_GENERATOR_DESC',

    interactions: interactions.base(),

    fileExt: '.bh.js',

    _getData: function(inputData) {
        return { declaration: u.bem.getName(inputData) };
    }

});
