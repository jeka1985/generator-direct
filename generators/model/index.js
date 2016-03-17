'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    interactions: interactions.pick([
        'blockName',
        'elem',
        'modName',
        'modVal',
        'baseModel',
        'delete'
    ]),

    fileExt: function(entity) {
        return /^dm|vm/.test(entity.blockName) ? '.js' : '.vm.js';
    },

    _getData: function(inputData) {
        var data = { model: u.bem.getName(inputData) };

        if(this.props.baseModel) data.baseModel = this.props.baseModel;

        return {
            declaration : u.bem.getJsDeclaration(data)
        };
    }

});


