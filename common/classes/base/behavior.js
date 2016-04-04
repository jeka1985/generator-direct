'use strict';

var u = require('../../utils'),
    _ = require('lodash');

module.exports = {

    prompting: {

        lang: function() {
            this._ask({
                questions: [{
                    type: 'list',
                    name: 'lang',
                    default: 'en',
                    message: this.iText.__('CHOOSE_LANG'),
                    choices: [
                        { name: this.iText.__('EN'), value: 'en' },
                        { name: this.iText.__('RU'), value: 'ru' }
                    ]
                }],
                callback: function (answers) {
                    this.config.set(answers);
                    this.iText.setLocale(answers.lang);
                },
                term: !this.config.get('lang')
            });
        },

        defaultLevel: function() {
            this._ask({
                questions: [{
                    type: 'input',
                    name: 'defaultLevel',
                    message: this.iText.__('CHOOSE_DEFAULT_REDEFINITION_LEVEL'),
                    default: 'desktop.blocks'
                }],
                callback: function (answers) {
                    this.config.set(answers);
                },
                term: !this.config.get('defaultLevel')
            });
        },

        blockName: function() {
            this._ask({
                questions: [{
                    type : 'input',
                    name : 'blockName',
                    message : this.iText.__('ASK_BLOCK_NAME'),
                    store: true,
                    validate: function(input) {
                        var result = u.bem.validateString(input);

                        return _.isObject(result) ?
                            this.iText.__(result.err) :
                            result;
                    }.bind(this)
                }],
                callback: function (answers) {
                    this.blockName = answers.blockName;
                },
                term: !this.blockName
            });
        },

        modVal: function() {
            this._ask({
                questions: [{
                    type : 'input',
                    name : 'modVal',
                    store: true,
                    message : this.iText.__('ASK_MOD_VAL'),
                    validate: function(input) {
                        var result = u.bem.validateString(input);

                        return _.isObject(result) ?
                            this.iText.__(result.err) :
                            result;
                    }.bind(this)
                }],
                callback: function (answers) {
                    this.options.modVal = answers.modVal;
                },
                term: (this.options.modName && !this.options.modVal)
            });
        }
    },

    configuring: function() {
        this.props = u.generator.parseProps(this.interactions, this);
        u.generator.formatProps(this.interactions, this.props);
    },

    writing: function() {
        this[this.props.delete ? '_delete' : '_create'](u.generator.cartesianProps(this.props, this.interactions));
    }
};

