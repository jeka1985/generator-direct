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

    _getData: function() {
        var data = { model: this._getBemName() };

        if(this.options.baseModel) data.baseModel = this.options.baseModel;

        return {
            declaration : Object.keys(data).map(function(key) {
                return [key, "'" + data[key] + "'"].join(': ');
            }).join(', ')
        };
    },

    writing: function () {
        var isSpecial = /^dm|vm/.test(this.blockName);

        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this._getPath(isSpecial ? '.js' : '.vm.js')),
            this._getData()
        );
    }
});
