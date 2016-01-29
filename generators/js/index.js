'use strict';

var Base = require('../../common/classes/BaseGenerator');

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
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this.getPath('.js')),
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
            declaration: Object.keys(declParams).map(function(key) {
                return [key, "'" + declParams[key] + "'"].join(': ');
            }).join(', ')
        };
    }
});
