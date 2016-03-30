'use strict';

var _ = require('lodash'),
    u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    descKey: 'APP_GENERATOR_DESC',

    interactions: interactions.all(),

    prompting: _.extend(_.clone(classes.behavior.prompting), {

        tech: function() {
            var dataFromNs = function(namespace) {
                    var data = namespace.split(':');

                    return { root: data[0], name: data[1] };
                },
                rootName = this.rootGeneratorName().split('-')[1],
                selfName = dataFromNs(this.options.namespace).name,
                keys = this.env.namespaces().reduce(function(result, namespace) {
                    var data = dataFromNs(namespace);

                    (rootName == data.root && data.name !== selfName) && result.push(data.name);

                    return result;
                }.bind(this), []);

            this._ask({
                questions: [{
                    type: 'checkbox',
                    name: 'tech',
                    pageSize: keys.length,
                    message: this.iText.__('CHOOSE_TECH'),
                    store: true,
                    default: keys.slice(0, 3),
                    choices: keys.map(function(opt) {
                        return { name: opt, value: opt };
                    }, this)
                }],
                callback: function (answers) {
                    this.options.tech = answers.tech.join(',');
                },
                term: !this.options.tech
            });
        }
    }),

    _getFileExt: function(entity) {
        return u.resultWith(this.env.create('direct:' + entity.tech), 'fileExt', [entity]);
    },

    _create: function() {
        this.props.tech.forEach(function(tech) {
            this.composeWith(['direct', tech].join(':'), {
                args: [this.props.blockName.join(',')],
                options: _.pick(this.options, this.interactions.map(function(item) {
                    return item.name;
                }))
            });
        }, this);
    }

});
