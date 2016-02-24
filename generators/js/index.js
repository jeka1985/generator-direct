'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    behavior = require('../../common/behaviors/baseBehavior'),
    _ = require('lodash');

module.exports = u.generator.create(Base, behavior, {

    settings: require('./settings'),

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
