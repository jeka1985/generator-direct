'use strict';

var _ = require('lodash'),
    u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    syntaxTypes: ['js', 'compact'],

    defaultSyntax: 'compact',

    descKey: 'BEMHTML_GENERATOR_DESC',

    interactions: interactions.pick([
        'blockName',
        'elem',
        'modName',
        'modVal',
        'delete',
        'bemhtml_syntax'
    ]),

    tmpFileName: function() {
        return this._getSyntaxType() + '.txt';
    },

    fileExt: function() {
        return this._getSyntaxType() == 'js' ? '.bemhtml.js' : '.bemhtml';
    },

    _getSyntaxType: function() {
        var options = this.options['bemhtml-syntax'];

        return _.includes(this.syntaxTypes, options) ? options : this.defaultSyntax;
    },

    _getData: function(inputData) {
        return {
            declaration: this._getSyntaxType() == 'js' ?
                u.bem.getName(inputData) :
                u.bem.getTplDecl(inputData.blockName, inputData)
        };
    }

});
