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
            this.destinationPath(this._getPath('.deps.js')),
            this._getData());
    },

    /**
     * Готовит данные для шаблонизации
     * @returns {Object}
     * @private
     */
    _getData: function() {
        var mustDeps = [],
            shouldDeps = [];

        this.isTechSelected('js') && shouldDeps.push('i-subscription-manager');

        return ['baseBlock', 'baseModel', 'implements'].reduce(function(hash, key) {

            this.options[key] && hash.mustDeps.push(this.options[key]);

            return hash;

        }.bind(this), { mustDeps: mustDeps, shouldDeps: shouldDeps });
    }
});
