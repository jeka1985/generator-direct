'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    utils = require('../../common/utils');

module.exports = Base.extend({

    prompting: {
        askName: function() {
            this.askName();
        },
        askModVal: function() {
            this.askModVal();
        }
    },

    writing: function () {
        var isSpecial = /^dm|vm/.test(this.blockName);

        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this._getPath(isSpecial ? '.js' : '.vm.js')),
            this._getData());
    },

    /**
     * Готовит данные для шаблонизации
     * @returns {Object}
     * @private
     */
    _getData: function() {
        var data = { model: this.getName() };

        if(this.options.baseModel) data.baseModel = this.options.baseModel;

        return {
            declaration : utils.getJsDeclaration(data)
        };
    }
});
