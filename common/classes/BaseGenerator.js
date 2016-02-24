'use strict';
var yeoman = require('yeoman-generator'),
    u = require('../utils'),
    _ = require('lodash');

module.exports = yeoman.Base.extend({

    constructor: function() {
        yeoman.Base.apply(this, arguments);

        this._defineInterations(this.settings.props);
    },

    /**
     * Декларирует аргументы и параметры
     */
    _defineInterations: function(params) {
        _.forEach(params, function(data) {
            this[data.kind](data.name, data);
        }.bind(this));
    },

    _getData: function(input) {
        return input;
    },

    /**
     * Хэлпер для задания вопросов пользователю
     * @param {Object} params - параметры
     * @param {String} params.items - список вопросов
     * @param {String} params.callback - коллбэк, вызываемый по завершению опроса
     */
    _prompt: function(params) {
        var done = this.async();

        this.prompt(params.items || [], function (answers) {
            _.isFunction(params.callback) && params.callback.call(this, answers);
            done();
        }.bind(this));
    },

    /**
     * Возвращает список вопросов в начале работы и коллбэк
     */
    _getStartPrompt: function() {

        return {
            items: [
                {
                    type : 'input',
                    name : 'blockName',
                    message : 'Название блока',
                    validate: function(input) {
                        return u.bem.validateString(input);
                    },
                    when: !this.props.blockName
                },
                {
                    type : 'input',
                    name : 'modVal',
                    message : 'Значение модификатора',
                    validate: function(input) {
                        return u.bem.validateString(input);
                    },
                    when: !!this.props.modName && !this.props.modVal
                }
            ],
            callback: function (answers) {
                _.assign(this.props, answers);
            }
        };
    }
});
