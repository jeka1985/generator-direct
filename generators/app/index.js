'use strict';

var _ = require('lodash'),
    u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    interactions: interactions.all(),

    prompting: _.extend(_.clone(classes.behavior.prompting), {

        tech: function() {
            var done = this.async(),
                dataFromNs = function(namespace) {
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

            !this.options.tech ?
                this.prompt([
                    {
                        type: 'checkbox',
                        name: 'tech',
                        pageSize: keys.length,
                        message: 'Which techs would you like to include?',
                        store: true,
                        default: keys.slice(0, 3),
                        choices: keys.map(function(opt) {
                            return { name: opt, value: opt };
                        }, this)
                    }
                ], function (answers) {
                    this.options.tech = answers.tech.join(',');
                    done();
                }.bind(this)):
                done();
        }
    }),

    _getFileExt: function(entity) {
        return u.resultWith(this.env.get('direct:' + entity.tech).prototype, 'fileExt', [entity]);
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
