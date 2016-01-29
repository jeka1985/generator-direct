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
        var opts = this.options,
            data = { block: this.blockName };

        if(opts.modName && opts.modVal) data.mod = [opts.modName, opts.modVal].join(' ');

        return {
            declaration: Object.keys(data).map(function(key) {
                return [key, data[key]].join(' ');
            }).join(', ')
        };
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('index.txt'),
            this.destinationPath(this._getPath('.bemtree.xjst')),
            this._getData()
        );
    }
});
