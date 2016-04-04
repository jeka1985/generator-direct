'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'STYLUS_GENERATOR_DESC',

    interactions: interactions.base(),

    fileExt: '.styl',

    _getData: function(inputData) {

        return {
            declaration: u.bem.getName(inputData)
        };
    }

});
