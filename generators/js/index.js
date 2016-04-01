'use strict';

var _ = require('lodash'),
    u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'JS_GENERATOR_DESC',

    interactions: interactions.base().concat(interactions.pick([
        'baseBlock',
        'implements'
    ])),

    fileExt: '.js',

    _getData: function(inputData) {

        return {
            declaration: u.bem.getJsDeclaration(_.without(_.keys(this.props), 'blockName').reduce(function(decl, key) {
                var data = inputData[key];

                if (data) decl[key] = data;

                return decl;
            }.bind(this), { name: inputData.blockName }))
        };
    }

});



