'use strict';
var yeoman = require('yeoman-generator'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    yosay = require('yosay'),
    utils = require('../utils');

   /* подтянуть утилс */

module.exports = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('blockName', { desc: 'Название блока', required: false });

        this.option('elem', { desc:'Имя элемента блока' });
        this.option('modName', { desc:'Имя модификатора блока' });
        this.option('modVal', { desc:'Значение модификатора блока' });
        this.option('tech', { desc: 'Список создаваемых технологий для блока' });
        this.option('baseBlock', { desc:'Имя базового блока' });
        this.option('baseModel', { desc:'Имя базовой модели' });
        this.option('implements', { desc:'Имя интерфейса блока' });

        this.root = this.config.get('root');
        this.techParams = this.config.get('techParams');
    },

    askName: function() {
        this._ask([
            {
                type : 'input',
                name : 'blockName',
                message : 'Название блока',
                when: !this.blockName
            }
        ], function (answers) {
            if (answers.blockName) this.blockName = answers.blockName;
        });
    },

    askModVal: function() {
        this._ask([
            {
                type : 'input',
                name : 'modVal',
                message : 'Значение модификатора',
                when: !!this.options.modName && !this.options.modVal
            }
        ], function (answers) {
            if (answers.modVal) this.options.modVal = answers.modVal;
        });
    },

    askTech: function() {
        this._ask([
            {
                type: 'checkbox',
                name: 'tech',
                message: 'Выберите технологии',
                when: !this.options.tech,
                choices: Object.keys(this.techParams).map(function(opt) {
                    return {
                        name: opt,
                        value: opt,
                        checked: this.techParams[opt].byDefault
                    }
                }, this)
            }
        ], function (answers) {
            if (answers.tech) this.options.tech = answers.tech;
        });
    },

    askApproval: function() {
        this._ask([
            {
                type: 'confirm',
                name: 'approve',
                message: yosay('Все готово, сохраняем ?')
            }
        ], function (answers) {
            !answers.approve && this._removePath(path.join(this.root, this._getBemFolder()))
        });
    },

    _ask: function(questions, callback) {
        var done = this.async();

        this.prompt(questions, function (answers) {

            callback.call(this, answers);

            done();
        }.bind(this));
    },

    /*в utils*/
    _getPath: function(ext) {

        return path.join(this.root, this._getBemFolder(), this._getBemName() + ext);
    },

    /*в utils*/
    _getBemName: function() {

        return utils.getBemName(this.blockName, this.options.elem, this.options.modName, this.options.modVal);
    },

    /*в utils*/
    _getBemFolder: function() {

        return utils.getBemFolder(this.blockName, this.options.elem, this.options.modName);
    },

    _getValidTechList: function(input) {
        var rawArray = typeof input == 'string' ? input.split(',') : input,
            validTech = Object.keys(this.techParams);

        return rawArray.reduce(function(arr, item) {

            if(validTech.indexOf(item) >= 0 && arr.indexOf(item) < 0) {
                arr.push(item);
            }

            return arr;

        }, []);
    },

    _removePath: function(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) {
                    this._removePath(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }, this);
            fs.rmdirSync(path);
        }
    },

    _isTechSelected: function(tech) {
        return this.options.tech && this._getValidTechList(this.options.tech).indexOf(tech) >= 0;
    }
});
