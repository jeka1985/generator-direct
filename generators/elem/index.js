'use strict';
var yeoman = require('yeoman-generator'),
    fs = require('fs'),
    path = require('path'),
    loader = require('../../loaders/base');

module.exports = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('elemName', {
            desc: 'Название элемента',
            required: false
        });

        this.argument('blockName', {
            desc: 'Название блока',
            required: false
        });

        this.argument('modName', {
            desc:'Имя модификатора блока',
            required: false
        });

        this.argument('modVal', {
            desc:'Значение модификатора блока',
            required: false
        });

        this.option('tech', {
            desc: 'Список создаваемых технологий для блока'
        });

        this.option('baseModel', {
            desc:'Имя базовой модели'
        });

        this.option('implement', {
            desc:'Имя интерфейса блока'
        });

        this.sourceRoot('./templates');
    },

    initializing: function () {
        this.helper = loader;

        this.defaultSet = [
            'js',
            'bemhtml',
            'md',
            'deps'
        ];

        this.techList = [
            'js',
            'md',
            'vm',
            'css',
            'test',
            'deps',
            'utils',
            'bemhtml',
            'bemtree'
        ];
    },

    prompting: function () {
        var done = this.async(),
            questions = [];

        !this.elemName && questions.push({
            type : 'input',
            name : 'elemName',
            message : 'Название элемента'
        });

        !this.blockName && questions.push({
            type : 'input',
            name : 'blockName',
            message : 'Название блока'
        });

        this.modName && !this.modVal && questions.push({
            type : 'input',
            name : 'modVal',
            message : 'Укажите значение модификатора'
        });

        !this.options.tech && questions.push({
            type: 'checkbox',
            name: 'tech',
            message: 'Выберите технологии',
            choices: this.techList.map(function(opt) {
                return {
                    name: opt,
                    value: opt,
                    checked: this.defaultSet.indexOf(opt) >= 0
                }
            }, this)
        });

        this.prompt(questions, function (answers) {
            this.answers = answers;
            done();
        }.bind(this))
    },

    _getParams: function() {
        return {
            elemName: this.elemName || this.answers.elemName,
            blockName: this.blockName || this.answers.blockName,
            modName: this.modName,
            modVal: this.modVal || this.answers.modVal,
            techList: this._getValid(this.options.tech || this.answers.tech),
            baseModel: this.options.baseModel,
            implement: this.options.implement
        };
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

    _getValid: function(input) {
        var rawArray = typeof input == 'string' ? input.split(',') : input,
            validTech = this.techList;

        return rawArray.reduce(function(arr, item) {

            if(validTech.indexOf(item) >= 0 && arr.indexOf(item) < 0) {
                arr.push(item);
            }

            return arr;

        }, []);
    },

    writing: function () {
        var params = this._getParams();

        params.techList.forEach(function(tech) {
            var destPath = this.helper.getPath(tech, params);

            this.fs.copyTpl(
                this.templatePath(this.helper.getTpl(tech)),
                this.destinationPath(destPath),
                this.helper.getData(tech, params));
        }, this);
    },

    end: function() {
        var done = this.async();

        this.prompt({
            type: 'confirm',
            name: 'approve',
            message: 'Файлы созданы, оставляем?'
        }, function (answers) {
            var params = this._getParams();

            !answers.approve && this._removePath(path.join(this.helper.root, params.blockName))

            done();
        }.bind(this))
    }
});
