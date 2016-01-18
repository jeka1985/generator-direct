'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        var tplPath = this.destinationPath(this.config.get('tplPath'));

        this.supportTechList = fs.readdirSync(tplPath).map(function(file) {
            return path.basename(path.join(tplPath, file), this.config.get('tplExt'))
        }, this);
    },

    getDestPath: function() {

        return path.join(
            this.config.get('destPath'),
            this.options.blockName,
            this.options.blockName + '.' + this.options.type);
    },

    getTechTpl: function() {

        return path.join(
            this.destinationRoot(),
            this.config.get('tplPath'),
            this.options.type + this.config.get('tplExt'));
    },

    writing: function () {
        _.includes(this.supportTechList, this.options.type) ?
            this.fs.copyTpl(
                this.templatePath(this.getTechTpl()),
                this.destinationPath(this.getDestPath()),
                { params: this.options }):
            console.log(yosay('Для технологии ' + this.options.type + ' не найден шаблон'))
    }
});
