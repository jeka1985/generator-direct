'use strict';

var _ = require('lodash');

module.exports = {

    /**
     * Хелпер для создания генератора
     * @param {Function} baseClass - базовый конструктор
     * @param {String|Array} mixins - набор или единичный микс-ин
     * @param {Object} overwrite - объект переопределения
     * @returns {Object}
     */
    compose: function(baseClass, mixins, overwrite) {
        var generator = baseClass.extend();

        _.forEach(_.isArray(mixins) ? mixins : [mixins], function(mix) {
            _.extend(generator.prototype, mix);
        });

        _.extend(generator.prototype, overwrite);

        return generator;
    },

    /**
     * Формирует объект параметров из данных генератора
     * @param {Array} settings - массив настроек
     * @param {Generator} ctx - генератор
     * @returns {Object}
     */
    parseProps: function (settings, ctx) {
        var resolve = {
            argument: function (name) {
                return ctx[name];
            },
            option: function (name) {
                return ctx.options[name];
            }
        };

        return _.reduce(settings, function(result, data) {
            _.set(result, data.name, resolve[data.kind](data.name));

            return result;
        }, {});
    },

    /**
     * Формирует значения объекта параметров
     * @param {Array} settings - массив настроек
     * @param {Object} data - исходные данные
     */
    formatProps: function (settings, data) {
        var formatter = {
            single: function (val) {
                return val ? val.trim() : '';
            },
            multi: function (val) {
                return _.isArray(val) ?
                    val :
                    val ?
                        val.trim().split(',') :
                        [];
            },
            boolean: function(val) {
                return !!val;
            }
        };

        _.forEach(data, function(val, key) {
            var type = _.find(settings, { name: key }).valType,
                formatMethod = formatter[type];

            data[key] = formatMethod ? formatMethod(val) : val;
        });
    },

    /**
     * Формирует декартово произведение сущностей из параметров генератора
     * @param {Object} props - объект параметров генератора
     * @param {Array} settings - массив настроек
     * @returns {Array}
     */
    cartesianProps: function (props, settings) {
        var getUnits = function(obj) {
            var keys = Object.keys(obj).filter(function(key) {
                    return !!obj[key].length;
                }),
                values = keys.map(function(x) {
                    return obj[x]
                }),
                trace = function (args) {
                    if(!args.length) return [[]];

                    var prod = trace(args.slice(1)),
                        r = [];

                    args[0].forEach(function(x) {
                        prod.forEach(function(p) {
                            r.push([x].concat(p));
                        });
                    });
                    return r;
                };

            return trace(values).map(function(p) {
                var result = {};

                keys.forEach(function(k, n) {
                    result[k] = p[n];
                });

                return result;
            });
        };

        return getUnits(_.pick(props, _.reduce(settings, function(result, setting) {
            !!setting.combine && result.push(setting.name);

            return result;
        }, [])));
    }
};



