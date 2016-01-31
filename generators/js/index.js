'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    utils = require('../../common/utils');

module.exports = Base.extend({

    prompting: {
        isName: function() {
            this.askName();
        },
        isModVal: function() {
            this.askModVal();
        }
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this._getPath('.js')),
            this._getData());
    },

    /**
     * Готовит данные для шаблонизации
     * @returns {Object}
     * @private
     */
    _getData: function() {
        var declParams = ['elem', 'modName', 'modVal', 'baseBlock', 'implements'].reduce(function(decl, key) {
            if (this.options[key]) decl[key] = this.options[key];

            return decl;
        }.bind(this), { name: this.blockName });

        return {
            declaration: utils.getJsDeclaration(declParams)
        };
    }
});
