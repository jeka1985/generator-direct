'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    behavior = require('../../common/behaviors/baseBehavior');

module.exports = u.generator.create(Base, behavior, {

    settings: require('./settings'),

    fileExt: function() {
        return /^dm|vm/.test(this.props.blockName) ? '.js' : '.vm.js';
    },

    _getData: function(inputData) {
        var data = { model: u.bem.getName(inputData) };

        if(this.props.baseModel) data.baseModel = this.props.baseModel;

        return {
            declaration : u.bem.getJsDeclaration(data)
        };
    }

});


