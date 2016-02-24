'use strict';

var Base = require('../../common/classes/BaseGenerator'),
    u = require('../../common/utils'),
    yosay = require('yosay'),
    behavior = require('../../common/behaviors/baseBehavior'),
    settings = require('./settings'),
    path = require('path'),
    _ = require('lodash');

module.exports = u.generator.create(Base, behavior, {

    settings: settings,

    _getStartPrompt: function() {
        var result = Base.prototype._getStartPrompt.apply(this);

        result.items.push({
            type: 'checkbox',
            name: 'tech',
            message: 'Выберите технологии',
            when: !this.props.tech || !this.props.tech.length,
            choices: Object.keys(settings.tech).map(function(opt) {
                return {
                    name: opt,
                    value: opt,
                    checked: settings.tech[opt].byDefault
                }
            }, this)
        });

        return result;
    },

    writing: function() {
        this.props.tech.forEach(function(tech) {
            this.composeWith(['direct', tech].join(':'), {
                args: [this.props.blockName.join(',')],
                options: _.pick(this.options, _.keys(this.props))
            });
        }, this);
    },

    end: function() {
        this._prompt({
            items: [
                {
                    type: 'confirm',
                    name: 'approve',
                    message: yosay('Все готово, сохраняем ?')
                }
            ],
            callback: function (answers) {
                !answers.approve && u.file.remove(u.generator.cartesianProps(this.props, settings.props).map(function(data) {
                    return path.join(
                        settings.root,
                        u.bem.getPath(data)) + _.result(this.env.get('direct:' + data.tech).prototype, 'fileExt');
                }, this));
            }
        });
    }

});

