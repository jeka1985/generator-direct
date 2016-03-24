'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'UTILS_GENERATOR_DESC',

    interactions: interactions.pick([
        'blockName',
        'elem',
        'modName',
        'modVal',
        'delete'
    ]),

    fileExt: '.utils.js',

    _getData: function(inputData) {
        return {
            declaration: u.bem.getName(inputData)
        };
    }

});






