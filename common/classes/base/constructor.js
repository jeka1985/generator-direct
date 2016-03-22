'use strict';

var yeoman = require('yeoman-generator'),
    u = require('../../utils'),
    path = require('path'),
    _ = require('lodash'),
    chalk = require('chalk'),
    i18n = require('i18n');

module.exports = yeoman.Base.extend({

    constructor: function() {
        yeoman.Base.apply(this, arguments);

        this._defineInterations(this.interactions);
        this._initI18n();
    },

    /**
     * Инициализирует мультиязычность
     */
    _initI18n: function() {

        this.iText = {};

        i18n.configure({
            locales: ['en', 'ru'],
            register: this.iText,
            defaultLocale: this.config.get('lang'),
            indent: "  ",
            directory: path.join(__dirname, '../../../locales'),
            syncFiles: true
        });

        i18n.init();
    },

    _ask: function(params) {
        var done = this.async();

        _.result(params, 'term') ?
            this.prompt(params.questions, function(answers) {
                params.callback.call(this, answers);
                done();
            }.bind(this)):
            done();
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
     * Вспомогательный метод для создания файлов
     * @param {Array} entities - массив сущностей
     */
    _create: function(entities) {
        entities.forEach(function(data) {
            this.fs.copyTpl(
                this.templatePath(this.tmpFileName || 'index.txt'),
                this.destinationPath(this._getFilePath(data)),
                this._getData(_.extend(this.props, data)));
        }, this);

    },

    _getFileExt: function(data) {
        return u.resultWith(this, 'fileExt', [data]);
    },

    _getFilePath: function(data) {
        return path.join(
            this.config.get('root'),
            u.bem.getPath(data)) + this._getFileExt(data);
    },

    /**
     * Вспомогательный метод для удаления файлов
     * @param {Array} entities - массив сущностей
     */
    _delete: function(entities) {
        var existingFiles = u.file.getExisting(entities.map(function(data) {
                return this._getFilePath(data);
            }, this)),
            num = existingFiles.length;

        if (!num) {
            this.log(chalk.inverse(this.iText.__('NOTHING_TO_DEL')));

            return;
        }

        this._ask({
            questions: [
                {
                    type: 'list',
                    name: 'choose',
                    message: this.iText.__('DEL'),
                    when: num > 1,
                    choices: [
                        { name: this.iText.__('ALL_ITEMS %s', num), value: false },
                        { name: this.iText.__('CHOOSE_FROM_LIST'), value: true }
                    ]
                },
                {
                    type: 'checkbox',
                    name: 'remove',
                    message: this.iText.__('FILES'),
                    pageSize: num,
                    when: function(answers) {
                        return answers.choose;
                    },
                    choices: existingFiles.map(function(file) {
                        return {
                            name: file,
                            value: file,
                            checked: true
                        };
                    })
                },
                {
                    type: 'confirm',
                    name: 'approve',
                    message: function() {
                        return [num == 1 ? existingFiles[0] : '', chalk.red(this.iText.__('APPROVE_DELETION'))].join(' ');
                    }.bind(this),
                    default: false
                }
            ],
            callback: function (answers) {
                answers.approve && (answers.remove || existingFiles).forEach(function(path) {
                    u.file.remove([path]);

                    this.log(chalk.grey('   deleted ') + path);
                }, this);
            },
            term: num
        });
    }
});
