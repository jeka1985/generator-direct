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
            this.destinationPath(this.getPath('.md')),
            this._getData());
    },

    /**
     * Готовит данные для шаблонизации
     * @returns {Object}
     * @private
     */
    _getData: function() {
        return {
            name: this.getName(),
            author: process.env['USER']
        }
    }
});
