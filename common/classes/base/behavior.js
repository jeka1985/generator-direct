'use strict';

var u = require('../../utils');

module.exports = {

    prompting: {

        root: function() {
            this._ask({
                questions: [{
                    type: 'input',
                    name: 'root',
                    message: this.iText.__('CHOOSE_ROOT'),
                    default: './desktop.blocks'
                }],
                callback: function (answers) {
                    this.config.set(answers);
                },
                term: !this.config.get('root')
            });
        },

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

        blockName: function() {
            this._ask({
                questions: [{
                    type : 'input',
                    name : 'blockName',
                    message : this.iText.__('ASK_BLOCK_NAME'),
                    store: true,
                    validate: function(input) {
                        return u.bem.validateString(input);
                    }
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
                        return u.bem.validateString(input);
                    }
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

