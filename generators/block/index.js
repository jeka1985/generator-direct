'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.generators.Base.extend({


    optionsData: {
        tech: {
            desc: 'Список создаваемых технологий для блока',
            type: String
        },
        all: {
            desc: 'Флаг для создания полного набора технологий',
            type: Boolean,
            defaults: false
        },
        base: {
            desc: 'Имя базового блока',
            type: String
        },
        implement: {
            desc: 'Имя интерфейса блока',
            type: String
        }
    },

    constructor: function () {
        yeoman.generators.NamedBase.apply(this, arguments);

        _.forOwn(this.optionsData, function(data, key) {
            this.option(key, data);
        }, this);

        this.argument('mod', { type: Object, required: false });






        var tplPath = this.destinationPath(this.config.get('tplPath'))

        this.supportTechList = fs.readdirSync(tplPath).map(function(file) {
            return path.basename(path.join(tplPath, file), this.config.get('tplExt'))
        }, this);
    },

    _getOptionsData: function() {
        return _.extend({}, this.options);
    },

    isSelectedTech: function() {
        return (!this.options.all && typeof this.options.tech == 'string' && !!this.options.tech.length);
    },

    getTech: function() {
        return this.isSelectedTech() ?
            this.options.tech.split(',') :
            this.supportTechList;
    },

    writing: function () {
        this.getTech().forEach(function(tech) {
            this.composeWith('direct:tech', {
                options: {
                    type: tech,
                    entity: 'block',
                    blockName: this.name,
                    params: _.pick(this.options, _.keys(this.optionsData))
                }
            });
        }, this)



    }
});
