'use strict';
var Base = require('../../common/classes/BaseGenerator');

module.exports = Base.extend({

    prompting: {
        askName: function() {
            this.askName();
        },
        askModVal: function() {
            this.askModVal();
        },
        askTech: function() {
            this.askTech();
        }
    },

    templates: function() {
        this._getValidTechList(this.options.tech).forEach(function(tech) {
            this.composeWith(['direct', tech].join(':'), {
                args: [this.blockName],
                options: this.options
            });
        }, this)
    },

    end: function() {
        this.askApproval();
    }
});
