'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'BEMHTML_GENERATOR_DESC',

    interactions: interactions.pick([
        'blockName',
        'elem',
        'modName',
        'modVal',
        'delete'
    ]),

    fileExt: '.bemhtml',

    _getData: function(inputData) {
        return { declaration: u.bem.getTplDecl(inputData.blockName, inputData) };
    }

});
